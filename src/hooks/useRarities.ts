import {useQuery} from '@tanstack/react-query';

import {api} from '../services';

export const useRarities = (collection: string) => {
  const {data: rarities, isLoading: raritiesLoading} = useQuery({
    queryKey: ['rarities', collection],
    queryFn: () => api.getRarities(collection),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    rarities: rarities || [],
    isLoading: raritiesLoading,
  };
};
