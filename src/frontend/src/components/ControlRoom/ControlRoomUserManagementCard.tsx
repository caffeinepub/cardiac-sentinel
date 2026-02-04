import { useState } from 'react';
import { useAddControlRoomUser } from '../../hooks/useAccessControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Principal } from '@dfinity/principal';

export default function ControlRoomUserManagementCard() {
  const [principalId, setPrincipalId] = useState('');
  const addUser = useAddControlRoomUser();

  const handleAddUser = async () => {
    if (!principalId.trim()) {
      toast.error('Please enter a principal ID');
      return;
    }

    try {
      const principal = Principal.fromText(principalId);
      await addUser.mutateAsync(principal);
      toast.success('Control room user added successfully');
      setPrincipalId('');
    } catch (error) {
      console.error('Add user error:', error);
      if (error instanceof Error && error.message.includes('Invalid principal')) {
        toast.error('Invalid principal ID format');
      } else {
        toast.error('Failed to add control room user');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>Add authorized users to the medical control room</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <p className="font-medium mb-1">Bootstrapping Information:</p>
            <p className="text-xs">
              The first administrator is automatically initialized when the canister is deployed. Only existing
              administrators can add new control room users by entering their Internet Identity principal ID below.
            </p>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="principal-input">Principal ID</Label>
          <Input
            id="principal-input"
            value={principalId}
            onChange={(e) => setPrincipalId(e.target.value)}
            placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxx"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Enter the Internet Identity principal of the user you want to authorize
          </p>
        </div>

        <Button onClick={handleAddUser} disabled={addUser.isPending} className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          {addUser.isPending ? 'Adding User...' : 'Add Control Room User'}
        </Button>
      </CardContent>
    </Card>
  );
}
