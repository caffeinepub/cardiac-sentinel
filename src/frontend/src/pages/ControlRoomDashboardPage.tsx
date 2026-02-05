import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsControlRoomUser } from '../hooks/useAccessControl';
import LoginButton from '../components/Auth/LoginButton';
import AccessDeniedScreen from '../components/Auth/AccessDeniedScreen';
import AlertsQueueTable from '../components/ControlRoom/AlertsQueueTable';
import AlertHistoryTable from '../components/ControlRoom/AlertHistoryTable';
import ControlRoomUserManagementCard from '../components/ControlRoom/ControlRoomUserManagementCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';

export default function ControlRoomDashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: isAuthorized, isLoading: authLoading } = useIsControlRoomUser();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
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
      <div className="container mx-auto px-4 py-12 md:py-16">
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
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Medical Control Room</h1>
        <p className="text-sm md:text-base text-muted-foreground">Monitor and respond to emergency alerts from Cardiac Sentinel devices</p>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">Active Alerts</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6 mt-6">
            <AlertsQueueTable />
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <AlertHistoryTable />
          </TabsContent>
        </Tabs>

        <ControlRoomUserManagementCard />
      </div>
    </div>
  );
}
