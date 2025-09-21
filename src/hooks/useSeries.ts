import {useQuery} from '@tanstack/react-query';

import {api} from '../services';

export const useSeries = () => {
  const {data: series, isLoading: seriesLoading} = useQuery({
    queryKey: ['series'],
    queryFn: () => api.getSeries(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    series: series || [],
    isLoading: seriesLoading,
  };
};
