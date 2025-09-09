import useSWR from 'swr';

import {api} from '../services';

export const useSets = (collection: string) => {
  const {data: sets, isLoading: setsLoading} = useSWR(
    `sets-${collection}`,
    () => api.getSets(collection),
  );

  return {
    setNumbers: sets || [],
    isLoading: setsLoading,
  };
};
