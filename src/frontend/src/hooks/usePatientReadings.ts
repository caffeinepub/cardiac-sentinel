import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Principal } from '@dfinity/principal';
import type { HeartRateReading } from '../backend';

export function useGetHeartRateReadings(user: Principal | undefined) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<HeartRateReading[]>({
    queryKey: ['heartRateReadings', user?.toString()],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.getHeartRateReadings(user);
    },
    enabled: !!actor && !actorFetching && !!user,
    refetchInterval: 5000,
  });
}
