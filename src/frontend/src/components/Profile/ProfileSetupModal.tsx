import { useState } from 'react';
import { useSaveUserProfile } from '../../hooks/useCurrentUserProfile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { EmergencyContact, ConditionNote } from '../../backend';

interface ProfileSetupModalProps {
  open: boolean;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [notes, setNotes] = useState<ConditionNote[]>([]);

  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [newNote, setNewNote] = useState({ name: '', type: '', description: '' });

  const saveProfile = useSaveUserProfile();

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: '', phone: '', relationship: '' });
    }
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const addNote = () => {
    if (newNote.name && newNote.description) {
      setNotes([...notes, newNote]);
      setNewNote({ name: '', type: '', description: '' });
    }
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!name || !age) {
      toast.error('Please fill in all required fields');
      return;
    }

    const profile = {
      name,
      age: BigInt(age),
      address,
      emergencyContactsId: 'contacts',
      knownConditionNoteId: 'notes',
    };

    try {
      await saveProfile.mutateAsync({ profile, contacts, notes });
      toast.success('Profile created successfully');
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('Failed to create profile');
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Welcome to Cardiac Sentinel</DialogTitle>
          <DialogDescription>
            Please set up your profile to get started. This information will be used in emergency situations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">
                  Age <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="30"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address / Location</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State, ZIP"
                rows={2}
              />
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-4">
            <h3 className="font-semibold">Emergency Contacts</h3>
            {contacts.length > 0 && (
              <div className="space-y-2">
                {contacts.map((contact, idx) => (
                  <Card key={idx}>
                    <CardContent className="flex items-center justify-between p-3">
                      <div>
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {contact.phone} • {contact.relationship}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeContact(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-3">
              <Input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
              <Input
                placeholder="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              />
            </div>
            <Button variant="outline" size="sm" onClick={addContact} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Known Medical Conditions</h3>
            {notes.length > 0 && (
              <div className="space-y-2">
                {notes.map((note, idx) => (
                  <Card key={idx}>
                    <CardContent className="flex items-start justify-between p-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{note.name}</p>
                        <p className="text-xs text-muted-foreground">{note.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeNote(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="space-y-3">
              <Input
                placeholder="Condition name"
                value={newNote.name}
                onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newNote.description}
                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                rows={2}
              />
            </div>
            <Button variant="outline" size="sm" onClick={addNote} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={saveProfile.isPending} className="w-full sm:w-auto">
            {saveProfile.isPending ? 'Creating Profile...' : 'Complete Setup'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
