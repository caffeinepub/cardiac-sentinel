import { useState } from 'react';
import { useCreateEmergencyAlert } from '../../hooks/usePatientAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AlertType, AlertSeverity } from '../../backend';

export default function SosButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const createAlert = useCreateEmergencyAlert();

  const handleSos = async () => {
    try {
      await createAlert.mutateAsync({ type: AlertType.manual, severity: AlertSeverity.high });
      toast.success('Emergency alert sent successfully', {
        description: 'Medical services have been notified of your emergency.',
      });
      setShowConfirm(false);
    } catch (error) {
      console.error('SOS error:', error);
      toast.error('Failed to send emergency alert');
    }
  };

  return (
    <>
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Emergency SOS
          </CardTitle>
          <CardDescription>Manually trigger an emergency alert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Press this button if you're experiencing a medical emergency. This will immediately alert medical services
            and send your location and emergency contacts.
          </p>
          <Button
            variant="destructive"
            size="lg"
            className="w-full h-20 text-lg font-bold"
            onClick={() => setShowConfirm(true)}
            disabled={createAlert.isPending}
          >
            <AlertCircle className="mr-2 h-6 w-6" />
            SEND SOS ALERT
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Emergency Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send an emergency SOS alert? This will notify medical services immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSos} className="bg-destructive hover:bg-destructive/90">
              Send Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
