import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';

import {GSLCard} from '../models/GSLCard';
import {api, CardFilters} from '../services';
import {mapApiCardsToGSLCards} from '../utils/cardMapper';

interface UseCardsParams {
  collection: string;
  filters?: CardFilters;
  enableInfiniteScroll?: boolean;
}

export const useCards = ({
  collection,
  filters = {},
  enableInfiniteScroll = false,
}: UseCardsParams) => {
  // For infinite scroll, we need to track accumulated data
  const {
    data: cardsData,
    isLoading: cardsLoading,
    mutate,
  } = useSWR(`cards-${collection}-${JSON.stringify(filters)}`, () =>
    api.getCards(collection, filters),
  );

  // State to track accumulated data for infinite scroll
  const [accumulatedCards, setAccumulatedCards] = useState<GSLCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  // Reset accumulated data when filters or sort order changes
  useEffect(() => {
    if (enableInfiniteScroll) {
      setIsResetting(true);
      setCurrentPage(1);
      setHasMorePages(true);
      setAccumulatedCards([]);
      // Small delay to ensure state is properly reset
      setTimeout(() => setIsResetting(false), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), enableInfiniteScroll]);

  // Update accumulated data when new data arrives (only for initial load)
  useEffect(() => {
    if (isResetting) return; // Don't update data while resetting

    if (cardsData?.data && enableInfiniteScroll && currentPage === 1) {
      // Only handle initial data load here, subsequent pages are handled in loadMore
      const newCards = mapApiCardsToGSLCards(cardsData.data);
      setAccumulatedCards(newCards);
      setHasMorePages(cardsData.pagination?.hasNextPage || false);
    } else if (
      cardsData &&
      !cardsData.data &&
      enableInfiniteScroll &&
      currentPage === 1
    ) {
      // Handle case where API returns empty data
      setAccumulatedCards([]);
      setHasMorePages(false);
    }
  }, [cardsData, enableInfiniteScroll, currentPage, isResetting]);

  // Function to load more data for infinite scroll
  const loadMore = useCallback(
    async (page: number) => {
      if (!enableInfiniteScroll || !hasMorePages || isResetting) return;

      setCurrentPage(page);
      const newFilters = {...filters, page};
      const newData = await api.getCards(collection, newFilters);

      // For infinite scroll, we need to handle the data accumulation directly
      // since the SWR key is based on the original filters
      if (newData?.data) {
        const newCards = mapApiCardsToGSLCards(newData.data);

        if (page === 1) {
          // First page - replace all data
          setAccumulatedCards(newCards);
        } else {
          // Subsequent pages - append data
          setAccumulatedCards((prev) => [...prev, ...newCards]);
        }
        setHasMorePages(newData.pagination?.hasNextPage || false);
      } else if (newData && !newData.data) {
        // Handle case where API returns empty data
        if (page === 1) {
          setAccumulatedCards([]);
          setHasMorePages(false);
        }
      }
    },
    [enableInfiniteScroll, hasMorePages, filters, collection, isResetting],
  );

  const finalData = enableInfiniteScroll
    ? accumulatedCards
    : cardsData?.data
      ? mapApiCardsToGSLCards(cardsData.data)
      : [];

  return {
    data: finalData,
    isLoading: cardsLoading || isResetting,
    pagination: cardsData?.pagination,
    loadMore: enableInfiniteScroll ? loadMore : undefined,
    mutate,
    hasMorePages,
  };
};
