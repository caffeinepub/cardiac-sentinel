import { useNavigate } from '@tanstack/react-router';
import { useGetAllAlerts } from '../../hooks/useControlRoomAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Eye, Clock, Activity, User } from 'lucide-react';
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

export default function AlertHistoryTable() {
  const navigate = useNavigate();
  const { data: alerts = [], isLoading } = useGetAllAlerts();

  const sortedAlerts = [...alerts].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          Alert History
        </CardTitle>
        <CardDescription>Complete history of all emergency alerts</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading alert history...</p>
        ) : sortedAlerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No alerts in history.</p>
        ) : (
          <>
            {/* Desktop table view */}
            <div className="hidden md:block rounded-md border">
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Patient</TableHead>
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
                        <TableCell className="font-mono text-xs">{alert.patient.toString().slice(0, 12)}...</TableCell>
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
              </ScrollArea>
            </div>

            {/* Mobile card view */}
            <div className="md:hidden space-y-3 max-h-[600px] overflow-y-auto">
              {sortedAlerts.map((alert) => (
                <Card key={alert.id.toString()} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">Alert #{alert.id.toString()}</CardTitle>
                      <div className="flex gap-1 flex-wrap justify-end">
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">{alert.severity}</Badge>
                        <Badge variant={getStatusColor(alert.status)} className="text-xs">{formatStatus(alert.status)}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-mono text-xs break-all">{alert.patient.toString().slice(0, 20)}...</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{formatType(alert.type)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{formatTimestamp(alert.timestamp)}</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate({ to: '/control-room/alert/$alertId', params: { alertId: alert.id.toString() } })}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
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
