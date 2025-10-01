import {useLocalSearchParams} from 'expo-router';
import React, {useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {XStack, YStack} from 'tamagui';

import {Gallery, PanelHeader} from '@/src/components';
import {ListingRail} from '@/src/components/screens/cards';
import {PanelProvider} from '@/src/contexts/PanelContext';
import {
  useInfiniteCards,
  useListings,
  useRarities,
  useSeries,
  useSets,
} from '@/src/hooks';
import {GSLCard} from '@/src/models/GSLCard';
import {CardFilters} from '@/src/services/api';

export default function CardsScreen() {
  const {slug} = useLocalSearchParams();
  const {listings} = useListings();

  const [panelWidth] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);
  const [currentListing, setCurrentListing] = useState(
    (slug as string) || 'goddess-story',
  );

  // Find the current listing data
  const listingData = listings.find((listing) => listing.id === currentListing);

  const togglePanel = () => {
    const openPanel = () => {
      Animated.timing(panelWidth, {
        toValue: 90,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setIsOpen(true);
    };

    const closePanel = () => {
      Animated.timing(panelWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setIsOpen(false);
    };

    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  };

  const handleListingChange = (newId: string) => {
    setCurrentListing(newId);
  };

  const [filter, setFilterData] = useState<GSLCard>({
    ID: '',
    Code: '',
    SetNumber: '',
    CardNumber: '',
    CharacterName: '',
    SeriesName: '',
    Rarity: '',
    ImageUrl: '',
    HasImage: '',
  });

  const [sort, setSortValue] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(50); // Default page size

  // Convert GSLCard filter to API filters
  const apiFilters: CardFilters = useMemo(() => {
    const filters: CardFilters = {
      page,
      limit,
      order: sort,
    };

    if (filter.CharacterName) filters.q = filter.CharacterName;
    if (filter.SeriesName) filters.series = filter.SeriesName;
    if (filter.Rarity) filters.rarity = filter.Rarity;
    if (filter.SetNumber) filters.set_number = filter.SetNumber;

    return filters;
  }, [filter, page, limit, sort]);

  const {
    cards: data,
    isLoading,
    pagination,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteCards({
    collection: currentListing,
    filters: apiFilters,
    enabled: true,
  });

  const {setNumbers} = useSets(currentListing);
  const {rarities} = useRarities(currentListing);
  const {series} = useSeries();

  const onFilter = (value: GSLCard) => {
    setFilterData(value);
    setPage(1); // Reset to first page when filtering
  };

  const onSort = (value: 'asc' | 'desc') => {
    setSortValue(value);
    setPage(1); // Reset to first page when sorting
  };

  // Update current listing when slug changes from URL
  useEffect(() => {
    if (slug) {
      setCurrentListing(slug as string);
    }
  }, [slug]);

  return (
    <PanelProvider togglePanel={togglePanel} isOpen={isOpen}>
      <XStack flex={1} flexDirection="row" backgroundColor="$background">
        <Animated.View
          style={[
            styles.panel,
            {
              width: panelWidth,
            },
          ]}
        >
          <ListingRail
            onListingSelect={handleListingChange}
            currentListing={currentListing}
          />
        </Animated.View>

        <YStack flex={1} backgroundColor="$background">
          <YStack flex={1} animation="quick" enterStyle={{opacity: 0, y: 10}}>
            <PanelHeader
              title={
                filter.SetNumber
                  ? filter.SetNumber.split('|').join(', ')
                  : listingData?.name || 'Goddess Story'
              }
              filter={filter}
              formData={{
                setNumbers: setNumbers || [],
                rarities: rarities || [],
                series: series || [],
              }}
              sort={sort}
              onFilter={onFilter}
              onSort={onSort}
            />

            <Gallery
              data={data || []}
              filter={filter}
              isLoading={isLoading}
              pagination={pagination}
              onPageChange={setPage}
              loadMore={undefined}
              hasMorePages={hasNextPage}
              enableAnimations
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              refetch={refetch}
              isRefreshing={isFetching && !isFetchingNextPage}
            />
          </YStack>
        </YStack>
      </XStack>
    </PanelProvider>
  );
}

const styles = StyleSheet.create({
  panel: {
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
