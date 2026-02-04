import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsControlRoomUser } from '../hooks/useAccessControl';
import LoginButton from '../components/Auth/LoginButton';
import AccessDeniedScreen from '../components/Auth/AccessDeniedScreen';
import AlertsQueueTable from '../components/ControlRoom/AlertsQueueTable';
import ControlRoomUserManagementCard from '../components/ControlRoom/ControlRoomUserManagementCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function ControlRoomDashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: isAuthorized, isLoading: authLoading } = useIsControlRoomUser();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>Medical Control Room</CardTitle>
            <CardDescription>Sign in to access the emergency alert control room</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="py-8 text-center text-muted-foreground">Checking authorization...</CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthorized) {
    return <AccessDeniedScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Control Room</h1>
        <p className="text-muted-foreground">Monitor and respond to emergency alerts from Cardiac Sentinel devices</p>
      </div>

      <div className="space-y-6">
        <AlertsQueueTable />
        <ControlRoomUserManagementCard />
      </div>
    </div>
  );
}
