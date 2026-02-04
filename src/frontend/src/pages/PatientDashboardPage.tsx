import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import LoginButton from '../components/Auth/LoginButton';
import ProfileSetupModal from '../components/Profile/ProfileSetupModal';
import MonitoringStatusCard from '../components/Patient/MonitoringStatusCard';
import ReadingsList from '../components/Patient/ReadingsList';
import SosButton from '../components/Patient/SosButton';
import SimulationControlsCard from '../components/Patient/SimulationControlsCard';
import ProfileEditorCard from '../components/Profile/ProfileEditorCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity } from 'lucide-react';

export default function PatientDashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>Patient Dashboard</CardTitle>
            <CardDescription>Sign in to access your heart monitoring dashboard</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ProfileSetupModal open={showProfileSetup} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your heart health and manage emergency settings
            {userProfile && <span className="ml-2">• Welcome, {userProfile.name}</span>}
          </p>
        </div>

        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <MonitoringStatusCard />
                <SimulationControlsCard />
                <ReadingsList />
              </div>
              <div>
                <SosButton />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileEditorCard />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
