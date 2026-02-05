import { useParams, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsControlRoomUser } from '../hooks/useAccessControl';
import { useGetAlertDetails, useGetFullProfile } from '../hooks/useControlRoomAlerts';
import AccessDeniedScreen from '../components/Auth/AccessDeniedScreen';
import AlertStatusActions from '../components/ControlRoom/AlertStatusActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Phone, MapPin, Activity, Clock, AlertCircle } from 'lucide-react';
import { AlertSeverity, AlertStatus, AlertType } from '../backend';

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
      return 'New Alert';
    case AlertStatus.acknowledged:
      return 'Acknowledged';
    case AlertStatus.dispatched:
      return 'Dispatched';
    case AlertStatus.resolved:
      return 'Resolved';
  }
}

function formatType(type: AlertType): string {
  return type === AlertType.automatic ? 'Automatic' : 'Manual SOS';
}

export default function ControlRoomAlertDetailPage() {
  const { alertId } = useParams({ from: '/control-room/alert/$alertId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAuthorized } = useIsControlRoomUser();

  const { data: alert, isLoading: alertLoading } = useGetAlertDetails(BigInt(alertId));
  const { data: profileData, isLoading: profileLoading } = useGetFullProfile(alert?.patient);

  const isAuthenticated = !!identity;

  if (!isAuthenticated || !isAuthorized) {
    return <AccessDeniedScreen />;
  }

  if (alertLoading || profileLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-8 text-center text-muted-foreground">Loading alert details...</CardContent>
        </Card>
      </div>
    );
  }

  if (!alert || !profileData) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-8 text-center text-muted-foreground">Alert not found</CardContent>
        </Card>
      </div>
    );
  }

  const [profile, contacts, notes] = profileData;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/control-room' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Control Room
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Alert Overview */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Alert #{alert.id.toString()}
                  </CardTitle>
                  <CardDescription className="mt-2">Emergency alert details and patient information</CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                  <Badge variant={getStatusColor(alert.status)}>{formatStatus(alert.status)}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Alert Time</p>
                    <p className="text-sm text-muted-foreground break-words">{formatTimestamp(alert.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Alert Type</p>
                    <p className="text-sm text-muted-foreground">{formatType(alert.type)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Name</p>
                <p className="text-base">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Age</p>
                <p className="text-base">{profile.age.toString()} years</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-1">Location</p>
                  <p className="text-base break-words">{profile.address || 'Not provided'}</p>
                </div>
              </div>

              {notes.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-2">Medical Conditions</p>
                    <div className="space-y-2">
                      {notes.map((note, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium text-sm">{note.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 break-words">{note.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          {contacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.map((contact, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium break-words">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        <p className="text-sm font-mono mt-1 break-all">{contact.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions Sidebar */}
        <div>
          <AlertStatusActions alert={alert} />
        </div>
      </div>
    </div>
  );
}
