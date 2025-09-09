import useSWR from 'swr';

import {api} from '../services';

export const useSeries = (collection: string) => {
  const {data: series, isLoading: seriesLoading} = useSWR(
    `series-${collection}`,
    () => api.getSeries(collection),
  );

  return {
    series: series || [],
    isLoading: seriesLoading,
  };
};
