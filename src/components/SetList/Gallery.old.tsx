import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors, Sizes} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import {PaginationInfo} from '../../services/api';
import Overlay from '../Overlay';
import {CardDetails} from './CardDetails';
import GalleryItem from './GalleryItem';
import SkeletonGalleryItem from './SkeletonGalleryItem';

interface GalleryProps {
  data: GSLCard[];
  filter: GSLCard;
  isLoading?: boolean;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  loadMore?: (page: number) => Promise<void>;
  hasMorePages?: boolean;
  enableAnimations?: boolean;
}

// Grid row data structure
interface GridRow {
  id: string;
  items: GSLCard[];
  isLastRow?: boolean;
}

export const Gallery = (props: GalleryProps) => {
  const {data, isLoading, pagination, loadMore, hasMorePages} = props;

  const [selectedCard, setSelectedCard] = useState<GSLCard | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const {width} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const loadMoreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Responsive column layout
  const columnCount = useMemo(() => {
    if (width < Sizes.sm) return 2;
    if (width >= Sizes.sm && width < Sizes.md) return 3;
    if (width >= Sizes.md && width < Sizes.lg) return 4;
    if (width >= Sizes.lg && width < Sizes.xl) return 5;
    return 6;
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

  // Memoized press handler to prevent re-renders
  const handleCardPress = useCallback((item: GSLCard) => {
    setSelectedCard(item);
  }, []);

  // Render row function with optimized memoization
  const renderRow = useCallback(
    ({item: row}: {item: GridRow}) => {
      return (
        <View style={styles.rowContainer}>
          {row.items.map((card, index) => (
            <View
              key={`${card.ID || card.Code}-${index}`}
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
                  key={`empty-${index}`}
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
    if (!loadingMore && !isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <View style={styles.footerSkeletonContainer}>
          {Array.from({length: columnCount}).map((_, index) => (
            <View
              key={`footer-skeleton-${index}`}
              style={[styles.itemContainer, {width: itemWidth}]}
            >
              <SkeletonGalleryItem width={itemWidth} />
            </View>
          ))}
        </View>
      </View>
    );
  }, [loadingMore, isLoadingMore, columnCount, itemWidth]);

  // Load more handler with debouncing
  const handleLoadMore = useCallback(async () => {
    if (!loadMore || !hasMorePages || loadingMore || isLoadingMore) {
      return;
    }

    // Clear any existing timeout
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }

    // Debounce the load more call
    loadMoreTimeoutRef.current = setTimeout(async () => {
      setIsLoadingMore(true);
      setLoadingMore(true);
      try {
        const nextPage = (pagination?.page || 1) + 1;
        await loadMore(nextPage);
      } catch (error) {
        console.error('Error loading more data:', error);
      } finally {
        setLoadingMore(false);
        setIsLoadingMore(false);
      }
    }, 300); // 300ms debounce
  }, [loadMore, hasMorePages, pagination, loadingMore, isLoadingMore]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadMoreTimeoutRef.current) {
        clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, []);

  // Skeleton loading data
  const skeletonRows = useMemo(() => {
    if (!isLoading) return [];
    const skeletonCount = columnCount * 3; // Show 3 rows of skeletons
    const rows: GridRow[] = [];
    for (let i = 0; i < skeletonCount; i += columnCount) {
      const rowItems = Array.from({length: columnCount}).map((_, index) => ({
        ID: `skeleton-${i + index}`,
        Code: `skeleton-${i + index}`,
      })) as GSLCard[];
      rows.push({
        id: `skeleton-row-${i}`,
        items: rowItems,
        isLastRow: i + columnCount >= skeletonCount,
      });
    }
    return rows;
  }, [isLoading, columnCount]);

  const renderSkeletonRow = useCallback(
    ({item: row}: {item: GridRow}) => {
      return (
        <View style={styles.rowContainer}>
          {row.items.map((_, index) => (
            <View
              key={`skeleton-${row.id}-${index}`}
              style={[styles.itemContainer, {width: itemWidth}]}
            >
              <SkeletonGalleryItem width={itemWidth} />
            </View>
          ))}
        </View>
      );
    },
    [itemWidth],
  );

  // Skeleton loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.galleryContainer}>
        <FlatList
          data={skeletonRows}
          renderItem={renderSkeletonRow}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </SafeAreaView>
    );
  }

  // Empty state
  if ((!data || data.length === 0) && !isLoading) {
    return (
      <SafeAreaView style={styles.galleryContainer}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cards found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.galleryContainer}>
      <FlatList
        ref={flatListRef}
        data={gridData}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
        windowSize={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={6}
        getItemLayout={(data, index) => ({
          length: itemWidth + 8, // itemWidth + margin
          offset: (itemWidth + 8) * Math.floor(index / columnCount),
          index,
        })}
      />

      {/* Card Details Overlay */}
      {selectedCard && (
        <Overlay
          isVisible={true}
          toggleOverlay={() => setSelectedCard(null)}
          type="fullscreen"
          showClose={false}
        >
          <CardDetails
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        </Overlay>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    backgroundColor: Colors.background,
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
  footerSkeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  footerLoaderText: {
    fontSize: 14,
    color: Colors.greyOutline,
  },
});

export default Gallery;
