import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsControlRoomUser } from '../../hooks/useAccessControl';
import LoginButton from '../Auth/LoginButton';
import InstallHelpDialog from '../PWA/InstallHelpDialog';
import { Button } from '@/components/ui/button';
import { Activity, Shield, Download } from 'lucide-react';

export default function AppHeader() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isControlRoomUser } = useIsControlRoomUser();
  const [showInstallHelp, setShowInstallHelp] = useState(false);

  const isAuthenticated = !!identity;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/assets/generated/cardiac-sentinel-logo.dim_512x512.png"
                alt="Cardiac Sentinel"
                className="h-10 w-10"
              />
              <span className="font-bold text-lg hidden sm:inline">Cardiac Sentinel</span>
            </Link>

            <nav className="flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate({ to: '/patient' })}
                    className="gap-2 hidden md:flex"
                  >
                    <Activity className="h-4 w-4" />
                    <span>Patient</span>
                  </Button>
                  {isControlRoomUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate({ to: '/control-room' })}
                      className="gap-2 hidden md:flex"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Control Room</span>
                    </Button>
                  )}
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInstallHelp(true)}
                className="gap-2 hidden sm:flex"
              >
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">Install</span>
              </Button>
              <LoginButton />
            </nav>
          </div>
        </div>
      </header>
      <InstallHelpDialog open={showInstallHelp} onOpenChange={setShowInstallHelp} />
    </>
  );
}
