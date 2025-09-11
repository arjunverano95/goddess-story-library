import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import {PaginationInfo} from '../../services/api';
import Overlay from '../Overlay';
import {CardDetails} from './CardDetails';
import GalleryItem from './GalleryItem';
import SkeletonGalleryWeb from './SkeletonGallery.web';

interface GalleryProps {
  data: GSLCard[];
  filter: GSLCard;
  isLoading?: boolean;
  pagination?: PaginationInfo;
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

export const Gallery = (props: GalleryProps) => {
  const {
    data,
    isLoading,
    pagination,
    loadMore,
    hasMorePages,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefreshing = false,
  } = props;
  const [selectedCard, setSelectedCard] = useState<GSLCard | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  // const [isNearBottom, setIsNearBottom] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // CSS Grid handles responsive layout automatically
  // No need for manual column calculations

  // Memoize the data to prevent unnecessary re-renders
  const galleryData = useMemo(() => {
    return data || [];
  }, [data]);

  // No need to chunk data for CSS Grid layout
  // const chunkedData = useMemo(() => {
  //   const chunks = [];
  //   for (let i = 0; i < galleryData.length; i += columnCount) {
  //     chunks.push(galleryData.slice(i, i + columnCount));
  //   }
  //   return chunks;
  // }, [galleryData, columnCount]);

  // Handle infinite scroll
  const handleLoadMore = useCallback(async () => {
    // Use React Query fetchNextPage if available, otherwise fall back to legacy loadMore
    if (fetchNextPage && hasMorePages && !isFetchingNextPage) {
      fetchNextPage();
    } else if (loadMore && hasMorePages && !loadingMore) {
      setLoadingMore(true);
      try {
        await loadMore((pagination?.page || 1) + 1);
      } catch (error) {
        console.error('Error loading more data:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [
    fetchNextPage,
    loadMore,
    hasMorePages,
    pagination,
    loadingMore,
    isFetchingNextPage,
  ]);

  // Handle infinite scroll with intersection observer for web
  const handleScroll = useCallback(
    (event: any) => {
      const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
      const isCloseToBottom =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 200;

      if (
        isCloseToBottom &&
        hasMorePages &&
        !loadingMore &&
        !isFetchingNextPage
      ) {
        handleLoadMore();
      }
    },
    [hasMorePages, loadingMore, isFetchingNextPage, handleLoadMore],
  );

  // Memoized card press handler
  const handleCardPress = useCallback((item: GSLCard) => {
    setSelectedCard(item);
  }, []);

  // Pull to refresh handler
  const handleRefresh = useCallback(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  // Memoized render functions for better performance
  const renderItem = useCallback(
    (item: GSLCard, index: number) => (
      <div
        key={`item-${index}`}
        className="gallery-item"
        data-animation-delay={index * 50}
      >
        <GalleryItem data={item} onPress={handleCardPress} />
      </div>
    ),
    [handleCardPress],
  );

  // Render footer with skeleton loading
  const renderFooter = useCallback(() => {
    const isLoadingMore = loadingMore || isFetchingNextPage;
    if (!isLoadingMore) return null;

    return (
      <div style={styles.footerLoader} className="gallery-footer">
        <SkeletonGalleryWeb itemCount={6} />
      </div>
    );
  }, [loadingMore, isFetchingNextPage]);

  // Inject CSS styles for web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      // Check if styles are already injected to avoid duplicates
      if (!document.querySelector('#gallery-web-styles')) {
        const style = document.createElement('style');
        style.id = 'gallery-web-styles';
        style.textContent = `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .gallery-item {
            transition: all 0.2s ease-in-out;
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
          }
          
          .gallery-item:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          }
          
          /* Set animation delay based on data attribute */
          .gallery-item[data-animation-delay="0"] { animation-delay: 0ms; }
          .gallery-item[data-animation-delay="50"] { animation-delay: 50ms; }
          .gallery-item[data-animation-delay="100"] { animation-delay: 100ms; }
          .gallery-item[data-animation-delay="150"] { animation-delay: 150ms; }
          .gallery-item[data-animation-delay="200"] { animation-delay: 200ms; }
          .gallery-item[data-animation-delay="250"] { animation-delay: 250ms; }
          .gallery-item[data-animation-delay="300"] { animation-delay: 300ms; }
          .gallery-item[data-animation-delay="350"] { animation-delay: 350ms; }
          .gallery-item[data-animation-delay="400"] { animation-delay: 400ms; }
          .gallery-item[data-animation-delay="450"] { animation-delay: 450ms; }
          .gallery-item[data-animation-delay="500"] { animation-delay: 500ms; }
          
          /* Responsive grid using CSS Grid for better performance */
          .gallery-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          
            margin: 0px;
            margin-bottom: 100px;
            padding: 0px;
            width: 100%;
          }
          
          /* Mobile first approach */
          @media (max-width: 480px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr);
            
            }
          }
          
          @media (min-width: 481px) and (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(3, 1fr);
           
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .gallery-grid {
              grid-template-columns: repeat(4, 1fr);
          
            }
          }
          
          @media (min-width: 1025px) and (max-width: 1200px) {
            .gallery-grid {
              grid-template-columns: repeat(5, 1fr);
             
            }
          }
          
          @media (min-width: 1201px) {
            .gallery-grid {
              grid-template-columns: repeat(6, 1fr);
             
            }
          }
          
          /* Ensure items maintain aspect ratio */
          .gallery-item {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (
      Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      hasMorePages &&
      (fetchNextPage || loadMore)
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !loadingMore && !isFetchingNextPage) {
            handleLoadMore();
          }
        },
        {threshold: 0.1, rootMargin: '100px'},
      );

      observerRef.current = observer;

      // Observe the footer element when it's rendered
      const footerElement = document.querySelector('.gallery-footer');
      if (footerElement) {
        observer.observe(footerElement);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [
    fetchNextPage,
    loadMore,
    hasMorePages,
    loadingMore,
    isFetchingNextPage,
    handleLoadMore,
  ]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.galleryContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SkeletonGalleryWeb itemCount={12} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Only show "No cards found" if we have data but it's empty
  if (!isLoading && data && data.length === 0) {
    return (
      <SafeAreaView style={styles.galleryContainer}>
        <div style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cards found</Text>
        </div>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.galleryContainer}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={true}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        // removeClippedSubviews={true}
        // maxToRenderPerBatch={10}
        // windowSize={10}
      >
        <div style={styles.galleryGrid} className="gallery-grid">
          {galleryData.map((item, index) => renderItem(item, index))}
        </div>

        {renderFooter()}
      </ScrollView>

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
    minHeight: 800, // Use viewport units for responsive height
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    padding: 10,
  },
  galleryGrid: {
    width: '100%',
    gap: 10,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
    width: '100%',
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
    minHeight: 400,
    width: '100%',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.greyOutline,
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    width: '100%',
  },
  footerLoaderText: {
    fontSize: 14,
    color: Colors.greyOutline,
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default Gallery;
