import { useState, useEffect, useRef } from 'react';
import { useActor } from './useActor';
import { useQueryClient } from '@tanstack/react-query';
import { ReadingStatus, AlertType, AlertSeverity, type HeartRateReading } from '../backend';

interface Thresholds {
  low: number;
  high: number;
}

export function useMonitoringSimulation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(false);
  const [lastReading, setLastReading] = useState<HeartRateReading | null>(null);
  const [thresholds, setThresholds] = useState<Thresholds>({ low: 50, high: 120 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateReading = async () => {
    if (!actor) return;

    const baseRate = 70;
    const variation = Math.floor(Math.random() * 40) - 20;
    const value = baseRate + variation;

    let status: ReadingStatus;
    let severity: AlertSeverity;

    if (value < thresholds.low || value > thresholds.high) {
      status = value < 40 || value > 140 ? ReadingStatus.critical : ReadingStatus.warning;
      severity = status === ReadingStatus.critical ? AlertSeverity.high : AlertSeverity.medium;
    } else {
      status = ReadingStatus.normal;
      severity = AlertSeverity.low;
    }

    const reading: HeartRateReading = {
      timestamp: BigInt(Date.now() * 1_000_000),
      value: BigInt(value),
      status,
    };

    try {
      await actor.addHeartRateReading(reading);
      setLastReading(reading);

      if (status !== ReadingStatus.normal) {
        await actor.createEmergencyAlert(AlertType.automatic, severity);
      }

      queryClient.invalidateQueries({ queryKey: ['heartRateReadings'] });
      queryClient.invalidateQueries({ queryKey: ['pendingAlerts'] });
    } catch (error) {
      console.error('Failed to add reading:', error);
    }
  };

  const start = () => {
    if (!isActive && actor) {
      setIsActive(true);
      generateReading();
      intervalRef.current = setInterval(generateReading, 10000);
    }
  };

  const stop = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isActive,
    lastReading,
    thresholds,
    setThresholds,
    start,
    stop,
  };
}
