import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useIsControlRoomUser } from '../../hooks/useAccessControl';
import { Activity, Shield, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { data: isControlRoomUser } = useIsControlRoomUser();

  const currentPath = routerState.location.pathname;

  const navItems = [
    {
      label: 'Patient',
      icon: Activity,
      path: '/patient',
      show: true,
    },
    {
      label: 'Control Room',
      icon: Shield,
      path: '/control-room',
      show: !!isControlRoomUser,
    },
  ];

  const visibleItems = navItems.filter((item) => item.show);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 safe-bottom">
      <div className="flex items-center justify-around h-16">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate({ to: item.path })}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full touch-target transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'text-destructive')} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
