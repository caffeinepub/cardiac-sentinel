import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AlertType, AlertSeverity, EmergencyAlert } from '../backend';

export function useGetMyAlerts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EmergencyAlert[]>({
    queryKey: ['myAlerts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyAlerts();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateEmergencyAlert() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, severity }: { type: AlertType; severity: AlertSeverity }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createEmergencyAlert(type, severity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heartRateReadings'] });
      queryClient.invalidateQueries({ queryKey: ['pendingAlerts'] });
      queryClient.invalidateQueries({ queryKey: ['myAlerts'] });
    },
  });
}
