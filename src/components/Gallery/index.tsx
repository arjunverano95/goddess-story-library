import {FlashList} from '@shopify/flash-list';
import {useRouter} from 'expo-router';
import {useCallback, useMemo, useRef} from 'react';
import {
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import {Colors, Sizes} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import GalleryItem from './GalleryItem';

interface GalleryProps {
  data: GSLCard[];
  filter: GSLCard;
  isLoading?: boolean;
  pagination?: any;
  onPageChange?: (page: number) => void;
  loadMore?: (page: number) => Promise<void>;
  hasMorePages?: boolean;
  enableAnimations?: boolean;
  // New props for React Query
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  refetch?: () => void;
  isRefreshing?: boolean;
}

// Grid row data structure
interface GridRow {
  id: string;
  items: GSLCard[];
  isLastRow?: boolean;
}

export const Gallery = (props: GalleryProps) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasMorePages,
    refetch,
    isRefreshing = false,
  } = props;

  const {width} = useWindowDimensions();
  const flashListRef = useRef(null);
  const router = useRouter();

  // Responsive column layout
  const columnCount = useMemo(() => {
    if (width < Sizes.sm) return 3;
    if (width >= Sizes.sm && width < Sizes.md) return 4;
    if (width >= Sizes.md && width < Sizes.lg) return 5;
    if (width >= Sizes.lg && width < Sizes.xl) return 6;
    return 7;
  }, [width]);

  // Calculate item dimensions
  const itemWidth = useMemo(() => {
    const padding = 20; // 10px padding on each side
    const margin = 4; // 2px margin on each side
    return (width - padding - (columnCount - 1) * margin) / columnCount;
  }, [width, columnCount]);

  // Convert data to grid rows
  const gridData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const rows: GridRow[] = [];
    for (let i = 0; i < data.length; i += columnCount) {
      const rowItems = data.slice(i, i + columnCount);
      rows.push({
        id: `row-${i}`,
        items: rowItems,
        isLastRow: i + columnCount >= data.length,
      });
    }
    return rows;
  }, [data, columnCount]);

  // Navigate to details screen on press
  const handleCardPress = useCallback(
    (item: GSLCard) => {
      router.push({
        pathname: '/card-details',
        params: {
          ID: item.ID,
          Code: item.Code,
          SetNumber: item.SetNumber,
          CardNumber: item.CardNumber,
          CharacterName: item.CharacterName,
          SeriesName: item.SeriesName,
          Rarity: item.Rarity,
          ImageUrl: item.ImageUrl,
          HasImage: item.HasImage,
        },
      });
    },
    [router],
  );

  // Render row function with optimized memoization
  const renderRow = useCallback(
    ({item: row}: {item: GridRow}) => {
      return (
        <View style={styles.rowContainer}>
          {row.items.map((card, index) => (
            <View
              key={`${row.id}-${index}`}
              style={[styles.itemContainer, {width: itemWidth}]}
            >
              <GalleryItem data={card} onPress={handleCardPress} />
            </View>
          ))}
          {/* Fill empty slots in last row */}
          {row.isLastRow &&
            row.items.length < columnCount &&
            Array.from({length: columnCount - row.items.length}).map(
              (_, index) => (
                <View
                  key={`empty-${row.id}-${index}`}
                  style={[styles.itemContainer, {width: itemWidth}]}
                />
              ),
            )}
        </View>
      );
    },
    [itemWidth, columnCount, handleCardPress],
  );

  const keyExtractor = useCallback((item: GridRow) => item.id, []);

  // Footer component for loading more
  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <Text style={styles.footerLoaderText}>Loading more...</Text>
      </View>
    );
  }, [isFetchingNextPage]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (fetchNextPage && hasMorePages && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasMorePages, isFetchingNextPage]);

  // Pull to refresh handler
  const handleRefresh = useCallback(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.galleryContainer}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading cards...</Text>
        </View>
      </View>
    );
  }

  // Empty state mirrors web: only when we have data but it's empty
  if (!isLoading && data && data.length === 0) {
    return (
      <View style={styles.galleryContainer}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cards found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.galleryContainer}>
      <FlashList
        ref={flashListRef}
        data={gridData}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 20,
  },
  listContainer: {
    padding: 10,
    paddingBottom: Platform.select({web: 0, native: 20}),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemContainer: {
    margin: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.greyOutline,
    marginTop: 10,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.greyOutline,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  footerLoaderText: {
    fontSize: 14,
    color: Colors.greyOutline,
  },
});

export default Gallery;
