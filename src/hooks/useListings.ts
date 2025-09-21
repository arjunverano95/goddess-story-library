import {useQuery} from '@tanstack/react-query';

import {api} from '../services';

export const useListings = () => {
  const {data: listings, isLoading: listingsLoading} = useQuery({
    queryKey: ['listings'],
    queryFn: () => api.getListings(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    listings: listings || [],
    isLoading: listingsLoading,
  };
};
