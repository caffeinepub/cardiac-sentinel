import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from './pages/LandingPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import ControlRoomDashboardPage from './pages/ControlRoomDashboardPage';
import ControlRoomAlertDetailPage from './pages/ControlRoomAlertDetailPage';
import AppShell from './components/Layout/AppShell';

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const patientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient',
  component: PatientDashboardPage,
});

const controlRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/control-room',
  component: ControlRoomDashboardPage,
});

const alertDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/control-room/alert/$alertId',
  component: ControlRoomAlertDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, patientRoute, controlRoomRoute, alertDetailRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
