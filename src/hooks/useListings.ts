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
export const useListing = (slug: string) => {
  const {data: listing, isLoading: listingLoading} = useQuery({
    queryKey: ['listings', slug],
    queryFn: () => api.getListing(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    listing: listing || null,
    isLoading: listingLoading,
  };
};
