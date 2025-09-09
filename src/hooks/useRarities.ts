import useSWR from 'swr';

import {api} from '../services';

export const useRarities = (collection: string) => {
  const {data: rarities, isLoading: raritiesLoading} = useSWR(
    `rarities-${collection}`,
    () => api.getRarities(collection),
  );

  return {
    rarities: rarities || [],
    isLoading: raritiesLoading,
  };
};
