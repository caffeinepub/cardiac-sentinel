import { useState } from 'react';
import { useUpdateAlertStatus } from '../../hooks/useControlRoomAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { AlertStatus, type EmergencyAlert } from '../../backend';

interface AlertStatusActionsProps {
  alert: EmergencyAlert;
}

export default function AlertStatusActions({ alert }: AlertStatusActionsProps) {
  const [selectedStatus, setSelectedStatus] = useState<AlertStatus>(alert.status);
  const updateStatus = useUpdateAlertStatus();

  const handleUpdateStatus = async () => {
    try {
      await updateStatus.mutateAsync({ alertId: alert.id, status: selectedStatus });
      toast.success('Alert status updated successfully');
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update alert status');
    }
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Update Status
        </CardTitle>
        <CardDescription>Change the alert status to track response progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status-select">Alert Status</Label>
          <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as AlertStatus)}>
            <SelectTrigger id="status-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={AlertStatus.newAlert}>New Alert</SelectItem>
              <SelectItem value={AlertStatus.acknowledged}>Acknowledged</SelectItem>
              <SelectItem value={AlertStatus.dispatched}>Dispatched</SelectItem>
              <SelectItem value={AlertStatus.resolved}>Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleUpdateStatus} disabled={updateStatus.isPending} className="w-full">
          {updateStatus.isPending ? 'Updating...' : 'Update Status'}
        </Button>

        <div className="pt-4 border-t space-y-2">
          <p className="text-xs font-medium">Status Guide:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>New:</strong> Alert just received</li>
            <li>• <strong>Acknowledged:</strong> Control room reviewing</li>
            <li>• <strong>Dispatched:</strong> Medical team en route</li>
            <li>• <strong>Resolved:</strong> Patient assisted</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
