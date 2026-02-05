import { useGetMyAlerts } from '../../hooks/usePatientAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Clock, Activity } from 'lucide-react';
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
  return type === AlertType.automatic ? 'Automatic' : 'Manual';
}

export default function AlertHistoryCard() {
  const { data: alerts = [], isLoading } = useGetMyAlerts();

  const sortedAlerts = [...alerts].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          My Alert History
        </CardTitle>
        <CardDescription>Your emergency alerts and their current status</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading your alert history...</p>
        ) : sortedAlerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No alerts in your history.</p>
        ) : (
          <>
            {/* Desktop table view */}
            <div className="hidden md:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-3">
              {sortedAlerts.map((alert) => (
                <Card key={alert.id.toString()} className="border">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">Alert #{alert.id.toString()}</CardTitle>
                      <div className="flex gap-1 flex-wrap justify-end">
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">{alert.severity}</Badge>
                        <Badge variant={getStatusColor(alert.status)} className="text-xs">{formatStatus(alert.status)}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{formatType(alert.type)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{formatTimestamp(alert.timestamp)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
