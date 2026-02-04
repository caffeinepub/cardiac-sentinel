import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedScreen() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>You do not have permission to access the Medical Control Room</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              <p className="font-medium mb-2">How to gain access:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Control room access is restricted to authorized medical personnel only</li>
                <li>An existing administrator must add your principal ID to the authorized users list</li>
                <li>Contact your system administrator to request access</li>
              </ul>
            </AlertDescription>
          </Alert>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">Bootstrapping Instructions</p>
            <p className="text-xs text-muted-foreground">
              The first administrator is automatically initialized when the canister is deployed. Subsequent control
              room users can be added through the user management interface by existing administrators.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
