import {useInfiniteQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

import {GSLCard} from '../models/GSLCard';
import {api, CardFilters} from '../services';
import {mapApiCardsToGSLCards} from '../utils/cardMapper';

interface UseInfiniteCardsParams {
  collection: string;
  filters?: CardFilters;
  enabled?: boolean;
}

export const useInfiniteCards = ({
  collection,
  filters = {},
  enabled = true,
}: UseInfiniteCardsParams) => {
  const queryKey = ['cards', collection, filters];

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({pageParam = 1}) => {
      const response = await api.getCards(collection, {
        ...filters,
        page: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination?.hasNextPage) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Flatten all pages into a single array of cards
  const cards = useMemo(() => {
    if (!data?.pages) return [];

    const allCards: GSLCard[] = [];
    data.pages.forEach((page) => {
      if (page?.data) {
        const mappedCards = mapApiCardsToGSLCards(page.data);
        allCards.push(...mappedCards);
      }
    });

    return allCards;
  }, [data?.pages]);

  // Get pagination info from the last page
  const pagination = useMemo(() => {
    if (!data?.pages?.length) return undefined;
    return data.pages[data.pages.length - 1]?.pagination;
  }, [data?.pages]);

  return {
    cards,
    pagination,
    error,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  };
};
