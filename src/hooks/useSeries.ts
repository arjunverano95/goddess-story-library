import {useQuery} from '@tanstack/react-query';

import {api} from '../services';

export const useSeries = (collection: string) => {
  const {data: series, isLoading: seriesLoading} = useQuery({
    queryKey: ['series', collection],
    queryFn: () => api.getSeries(collection),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    series: series || [],
    isLoading: seriesLoading,
  };
};
