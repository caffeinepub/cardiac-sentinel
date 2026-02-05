import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Download } from 'lucide-react';
import { SiApple, SiAndroid } from 'react-icons/si';

interface InstallHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InstallHelpDialog({ open, onOpenChange }: InstallHelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Download className="h-6 w-6 text-destructive" />
            Install Cardiac Sentinel
          </DialogTitle>
          <DialogDescription>
            Add Cardiac Sentinel to your home screen for quick access and an app-like experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SiApple className="h-5 w-5" />
                iPhone (Safari)
              </CardTitle>
              <CardDescription>Follow these steps to install on iOS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-sm">Open this website in <strong>Safari</strong> browser</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-sm">Tap the <strong>Share</strong> button (square with arrow pointing up) at the bottom of the screen</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-sm">Scroll down and tap <strong>"Add to Home Screen"</strong></p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p className="text-sm">Tap <strong>"Add"</strong> in the top right corner</p>
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  The app icon will appear on your home screen. Tap it to open Cardiac Sentinel like a native app.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SiAndroid className="h-5 w-5" />
                Android (Chrome)
              </CardTitle>
              <CardDescription>Follow these steps to install on Android</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-sm">Open this website in <strong>Chrome</strong> browser</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-sm">Tap the <strong>three dots (⋮)</strong> menu in the top right corner</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-sm">Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p className="text-sm">Tap <strong>"Add"</strong> or <strong>"Install"</strong> to confirm</p>
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  The app icon will appear on your home screen. Tap it to open Cardiac Sentinel like a native app.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smartphone className="h-4 w-4" />
                Important Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a <strong>web application</strong> (PWA), not available on the App Store or Play Store. 
                It works directly in your browser and can be installed to your home screen for easy access. 
                This is a <strong>demo application</strong> for educational and project purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
