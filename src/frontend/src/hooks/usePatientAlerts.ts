import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AlertType, AlertSeverity } from '../backend';

export function useCreateEmergencyAlert() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, severity }: { type: AlertType; severity: AlertSeverity }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createEmergencyAlert(type, severity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heartRateReadings'] });
      queryClient.invalidateQueries({ queryKey: ['pendingAlerts'] });
    },
  });
}
