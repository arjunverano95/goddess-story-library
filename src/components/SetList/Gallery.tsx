import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors, Sizes} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import {PaginationInfo} from '../../services/api';
import Overlay from '../Overlay';
import {CardDetails} from './CardDetails';
import GalleryItem from './GalleryItem';

interface GalleryProps {
  data: GSLCard[];
  filter: GSLCard;
  isLoading?: boolean;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  loadMore?: (page: number) => Promise<void>;
  hasMorePages?: boolean;
  enableVirtualization?: boolean;
  enableAnimations?: boolean;
  cardAspectRatio?: number;
}

export const Gallery = (props: GalleryProps) => {
  const {
    data,
    isLoading,
    pagination,
    loadMore,
    hasMorePages,
    enableVirtualization = true,
    enableAnimations = true,
    cardAspectRatio = 1,
  } = props;

  const [selectedCard, setSelectedCard] = useState<GSLCard | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // const [isScrolling, setIsScrolling] = useState(false);
  const {width} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);

  // Animation values
  const scrollY = useSharedValue(0);
  const fadeAnim = useSharedValue(1);

  // Responsive column layout - memoized for performance
  const columnCount = useMemo(() => {
    if (width < Sizes.sm) return 2;
    if (width >= Sizes.sm && width < Sizes.md) return 3;
    if (width >= Sizes.md && width < Sizes.lg) return 4;
    if (width >= Sizes.lg && width < Sizes.xl) return 5;
    return 6;
  }, [width]);

  // Calculate item dimensions for better performance
  const itemWidth = useMemo(() => {
    const padding = 20; // 10px padding on each side
    const margin = 4; // 2px margin on each side
    return (width - padding - (columnCount - 1) * margin) / columnCount;
  }, [width, columnCount]);

  const itemHeight = useMemo(() => {
    return itemWidth * cardAspectRatio + 80; // Add space for text content
  }, [itemWidth, cardAspectRatio]);

  // Memoize the data to prevent unnecessary re-renders
  const galleryData = useMemo(() => {
    return data || [];
  }, [data]);

  // Memoized render functions for better performance
  const renderItem = useCallback(
    ({item, index}: {item: GSLCard; index: number}) => {
      if (enableAnimations) {
        return (
          <AnimatedGalleryItem
            item={item}
            index={index}
            onPress={setSelectedCard}
          />
        );
      }

      return (
        <View
          style={[styles.itemContainer, {width: itemWidth, height: itemHeight}]}
        >
          <GalleryItem
            data={item}
            onPress={(item) => {
              setSelectedCard(item);
            }}
          />
        </View>
      );
    },
    [enableAnimations, itemWidth, itemHeight, setSelectedCard],
  );

  const keyExtractor = useCallback((item: GSLCard) => item.ID || item.Code, []);

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.footerLoaderText}>Loading more cards...</Text>
      </View>
    );
  }, [loadingMore]);

  const getItemLayout = useCallback(
    (data: any, index: number) => {
      return {
        length: itemHeight,
        offset: itemHeight * Math.floor(index / columnCount),
        index,
      };
    },
    [itemHeight, columnCount],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh delay for smooth UX
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Handle infinite scroll
  const handleLoadMore = useCallback(async () => {
    if (!loadMore || !hasMorePages || loadingMore) return;

    setLoadingMore(true);
    try {
      await loadMore((pagination?.page || 1) + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadMore, hasMorePages, pagination, loadingMore]);

  // Scroll handling for animations
  const handleScroll = useCallback(
    (event: any) => {
      if (enableAnimations) {
        scrollY.value = event.nativeEvent.contentOffset.y;
      }
    },
    [enableAnimations, scrollY],
  );

  const handleScrollBeginDrag = useCallback(() => {
    // setIsScrolling(true);
    if (enableAnimations) {
      fadeAnim.value = withTiming(0.8, {duration: 200});
    }
  }, [enableAnimations, fadeAnim]);

  const handleScrollEndDrag = useCallback(() => {
    // setIsScrolling(false);
    if (enableAnimations) {
      fadeAnim.value = withTiming(1, {duration: 200});
    }
  }, [enableAnimations, fadeAnim]);

  // Animated style for the list
  const animatedListStyle = useAnimatedStyle(() => {
    return {
      opacity: enableAnimations ? fadeAnim.value : 1,
    };
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.galleryContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading cards...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
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
      <Animated.View style={[styles.listWrapper, animatedListStyle]}>
        <FlatList
          ref={flatListRef}
          data={galleryData}
          numColumns={columnCount}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
              progressBackgroundColor={Colors.background}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          getItemLayout={enableVirtualization ? getItemLayout : undefined}
          removeClippedSubviews={enableVirtualization}
          maxToRenderPerBatch={enableVirtualization ? 8 : undefined}
          updateCellsBatchingPeriod={enableVirtualization ? 50 : undefined}
          initialNumToRender={enableVirtualization ? 6 : undefined}
          windowSize={enableVirtualization ? 5 : undefined}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
        />
      </Animated.View>

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

// Animated Gallery Item Component
const AnimatedGalleryItem = React.memo(
  ({
    item,
    index,
    onPress,
  }: {
    item: GSLCard;
    index: number;
    onPress: (item: GSLCard) => void;
  }) => {
    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);

    useEffect(() => {
      // Staggered animation for items
      const delay = index * 50;
      setTimeout(() => {
        translateY.value = withSpring(0, {damping: 15, stiffness: 100});
        opacity.value = withTiming(1, {duration: 300});
        scale.value = withSpring(1, {damping: 15, stiffness: 100});
      }, delay);
    }, [index, translateY, opacity, scale]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: translateY.value}, {scale: scale.value}],
        opacity: opacity.value,
      };
    });

    return (
      <Animated.View style={[styles.itemContainer, animatedStyle]}>
        <GalleryItem data={item} onPress={onPress} />
      </Animated.View>
    );
  },
);

AnimatedGalleryItem.displayName = 'AnimatedGalleryItem';

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    paddingBottom: Platform.select({web: 0, native: 10}),
    backgroundColor: Colors.background,
  },
  listWrapper: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.greyOutline,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.greyOutline,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  footerLoaderText: {
    fontSize: 14,
    color: Colors.greyOutline,
  },
});

export default Gallery;
