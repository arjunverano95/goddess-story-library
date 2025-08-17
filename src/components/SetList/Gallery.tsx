import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FlashList} from '@shopify/flash-list';

import {Colors, Sizes} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import Overlay from '../Overlay';
import {CardDetails} from './CardDetails';
import GalleryItem from './GalleryItem';

interface GalleryProps {
  data: GSLCard[];
  filter: GSLCard;
  sort: 'asc' | 'desc';
}

export const Gallery = (props: GalleryProps) => {
  const {data, filter, sort} = props;
  const [galleryData, setGalleryData] = useState<GSLCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<GSLCard | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const {width} = useWindowDimensions();

  // Responsive column layout
  const getColumnCount = () => {
    if (width < Sizes.sm) return 2;
    if (width >= Sizes.sm && width < Sizes.md) return 3;
    if (width >= Sizes.md && width < Sizes.lg) return 4;
    if (width >= Sizes.lg && width < Sizes.xl) return 5;
    return 6;
  };

  useEffect(() => {
    if (data) {
      const cleanFilter = {...filter};
      Object.keys(cleanFilter).forEach((key) => {
        if (!cleanFilter[key as keyof GSLCard]) {
          delete cleanFilter[key as keyof GSLCard];
        }
      });

      const sortData = (data: GSLCard[], order: 'asc' | 'desc') => {
        if (order === 'asc') {
          return data.sort(
            (a, b) =>
              a.SetNumber.localeCompare(b.SetNumber) ||
              b.Rarity.localeCompare(a.Rarity) ||
              Number(a.CardNumber) - Number(b.CardNumber),
          );
        } else {
          return data.sort(
            (a, b) =>
              a.SetNumber.localeCompare(b.SetNumber) ||
              b.Rarity.localeCompare(a.Rarity) ||
              Number(b.CardNumber) - Number(a.CardNumber),
          );
        }
      };

      const filteredData = data.filter((item) => {
        for (const key in cleanFilter) {
          const filterKey = key as keyof GSLCard;
          if (cleanFilter[filterKey]) {
            if (filterKey === 'CharacterName') {
              if (
                !item[filterKey]
                  .toLowerCase()
                  .includes(cleanFilter[filterKey]!.toLowerCase())
              )
                return false;
            } else if (
              filterKey === 'SetNumber' ||
              filterKey === 'Rarity' ||
              filterKey === 'SeriesName'
            ) {
              // Handle multi-select fields - check if item value is included in filter
              const filterValue = cleanFilter[filterKey] as string;
              const filterArray = filterValue.split(', ').map((s) => s.trim());
              if (!filterArray.includes(item[filterKey])) return false;
            } else if (item[filterKey] !== cleanFilter[filterKey]) return false;
          }
        }
        return true;
      });

      setGalleryData(sortData(filteredData, sort));
    }
  }, [data, filter, sort]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh delay for smooth UX
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
      <FlashList
        data={galleryData}
        numColumns={getColumnCount()}
        renderItem={({item}) => (
          <View style={{flex: 1, margin: 5}}>
            <GalleryItem
              data={item}
              onPress={(item) => {
                setSelectedCard(item);
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.ID || item.Code}
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
        overScrollMode="never"
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
    paddingBottom: Platform.select({web: 0, native: 10}),
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 10,
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
});
