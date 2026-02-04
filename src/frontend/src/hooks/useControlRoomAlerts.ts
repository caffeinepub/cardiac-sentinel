import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Principal } from '@dfinity/principal';
import type { EmergencyAlert, AlertStatus, UserProfile, EmergencyContact, ConditionNote } from '../backend';

export function useGetPendingAlerts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EmergencyAlert[]>({
    queryKey: ['pendingAlerts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingAlerts();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
  });
}

export function useGetAlertDetails(alertId: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EmergencyAlert>({
    queryKey: ['alertDetails', alertId?.toString()],
    queryFn: async () => {
      if (!actor || alertId === undefined) throw new Error('Actor or alertId not available');
      return actor.getAlertDetails(alertId);
    },
    enabled: !!actor && !actorFetching && alertId !== undefined,
  });
}

export function useGetFullProfile(patient: Principal | undefined) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<[UserProfile, EmergencyContact[], ConditionNote[]]>({
    queryKey: ['fullProfile', patient?.toString()],
    queryFn: async () => {
      if (!actor || !patient) throw new Error('Actor or patient not available');
      return actor.getFullProfile(patient);
    },
    enabled: !!actor && !actorFetching && !!patient,
  });
}

export function useUpdateAlertStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ alertId, status }: { alertId: bigint; status: AlertStatus }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateAlertStatus(alertId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingAlerts'] });
      queryClient.invalidateQueries({ queryKey: ['alertDetails'] });
    },
  });
}
