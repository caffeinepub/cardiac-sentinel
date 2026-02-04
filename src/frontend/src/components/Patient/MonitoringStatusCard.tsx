import { useMonitoringSimulation } from '../../hooks/useMonitoringSimulation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle2, XCircle } from 'lucide-react';

export default function MonitoringStatusCard() {
  const { isActive } = useMonitoringSimulation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Monitoring Status
        </CardTitle>
        <CardDescription>Current device monitoring state</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {isActive ? (
            <>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                    Active
                  </Badge>
                  <span className="text-sm text-muted-foreground">Monitoring in progress</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your heart rate is being continuously monitored. Emergency alerts will be sent automatically if
                  abnormal activity is detected.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <XCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">Inactive</Badge>
                  <span className="text-sm text-muted-foreground">Not monitoring</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start the monitoring simulation below to begin tracking heart rate readings.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
