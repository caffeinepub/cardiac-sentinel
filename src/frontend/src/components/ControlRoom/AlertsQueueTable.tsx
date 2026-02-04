import { useNavigate } from '@tanstack/react-router';
import { useGetPendingAlerts } from '../../hooks/useControlRoomAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Eye } from 'lucide-react';
import { AlertSeverity, AlertStatus, AlertType } from '../../backend';

function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleString();
}

function getSeverityColor(severity: AlertSeverity): 'default' | 'secondary' | 'destructive' {
  switch (severity) {
    case AlertSeverity.high:
      return 'destructive';
    case AlertSeverity.medium:
      return 'default';
    case AlertSeverity.low:
      return 'secondary';
  }
}

function getStatusColor(status: AlertStatus): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case AlertStatus.newAlert:
      return 'destructive';
    case AlertStatus.acknowledged:
      return 'default';
    case AlertStatus.dispatched:
      return 'default';
    case AlertStatus.resolved:
      return 'secondary';
  }
}

function formatStatus(status: AlertStatus): string {
  switch (status) {
    case AlertStatus.newAlert:
      return 'New';
    case AlertStatus.acknowledged:
      return 'Acknowledged';
    case AlertStatus.dispatched:
      return 'Dispatched';
    case AlertStatus.resolved:
      return 'Resolved';
  }
}

function formatType(type: AlertType): string {
  return type === AlertType.automatic ? 'Auto' : 'Manual';
}

export default function AlertsQueueTable() {
  const navigate = useNavigate();
  const { data: alerts = [], isLoading } = useGetPendingAlerts();

  const sortedAlerts = [...alerts].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Active Alerts Queue
        </CardTitle>
        <CardDescription>Emergency alerts requiring attention (auto-refreshes every 10 seconds)</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading alerts...</p>
        ) : sortedAlerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No active alerts at this time.</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAlerts.map((alert) => (
                  <TableRow key={alert.id.toString()}>
                    <TableCell className="font-medium">#{alert.id.toString()}</TableCell>
                    <TableCell>{formatType(alert.type)}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(alert.status)}>{formatStatus(alert.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatTimestamp(alert.timestamp)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: '/control-room/alert/$alertId', params: { alertId: alert.id.toString() } })}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
