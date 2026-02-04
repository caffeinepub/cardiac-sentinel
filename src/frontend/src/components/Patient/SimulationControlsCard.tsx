import { useState } from 'react';
import { useMonitoringSimulation } from '../../hooks/useMonitoringSimulation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Square, Settings } from 'lucide-react';

export default function SimulationControlsCard() {
  const { isActive, lastReading, start, stop, thresholds, setThresholds } = useMonitoringSimulation();

  const [lowThreshold, setLowThreshold] = useState(thresholds.low.toString());
  const [highThreshold, setHighThreshold] = useState(thresholds.high.toString());

  const handleUpdateThresholds = () => {
    const low = parseInt(lowThreshold);
    const high = parseInt(highThreshold);
    if (!isNaN(low) && !isNaN(high) && low > 0 && high > low) {
      setThresholds({ low, high });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Monitoring Simulation
        </CardTitle>
        <CardDescription>Control heart rate monitoring and configure alert thresholds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Control Buttons */}
        <div className="flex gap-3">
          {!isActive ? (
            <Button onClick={start} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Start Monitoring
            </Button>
          ) : (
            <Button onClick={stop} variant="outline" className="flex-1">
              <Square className="mr-2 h-4 w-4" />
              Stop Monitoring
            </Button>
          )}
        </div>

        {/* Last Reading */}
        {lastReading && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-1">Last Reading</p>
            <p className="text-2xl font-bold">{lastReading.value.toString()} BPM</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(Number(lastReading.timestamp) / 1_000_000).toLocaleTimeString()}
            </p>
          </div>
        )}

        {/* Threshold Configuration */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-3">Alert Thresholds</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Automatic alerts will be triggered when readings fall outside these ranges
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="low-threshold">Low Threshold (BPM)</Label>
              <Input
                id="low-threshold"
                type="number"
                value={lowThreshold}
                onChange={(e) => setLowThreshold(e.target.value)}
                min="30"
                max="200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="high-threshold">High Threshold (BPM)</Label>
              <Input
                id="high-threshold"
                type="number"
                value={highThreshold}
                onChange={(e) => setHighThreshold(e.target.value)}
                min="30"
                max="200"
              />
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleUpdateThresholds} className="w-full">
            Update Thresholds
          </Button>
          <p className="text-xs text-muted-foreground">
            Current: {thresholds.low} - {thresholds.high} BPM (Normal range)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
