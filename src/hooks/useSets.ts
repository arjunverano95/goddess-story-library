import {useQuery} from '@tanstack/react-query';

import {api} from '../services';

export const useSets = (collection: string) => {
  const {data: sets, isLoading: setsLoading} = useQuery({
    queryKey: ['sets', collection],
    queryFn: () => api.getSets(collection),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    setNumbers: sets || [],
    isLoading: setsLoading,
  };
};
