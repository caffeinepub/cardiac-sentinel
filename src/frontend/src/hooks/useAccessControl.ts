import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Principal } from '@dfinity/principal';

export function useIsControlRoomUser() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isControlRoomUser'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isControlRoomUser();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddControlRoomUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Principal) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addControlRoomUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isControlRoomUser'] });
    },
  });
}
