import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FlashList} from '@shopify/flash-list';

import {Colors, Sizes} from '../../../app/constants';
import {useGSL} from '../../../app/hooks/useGSL';
import {GSLCard} from '../../../models/GSLCard';
import CardDetails from '../../CardDetails';
import Overlay from '../../Overlay';
import GalleryItem from './GalleryItem';

interface GalleryProps {
  filter: GSLCard;
  sort: 'asc' | 'desc';
}

export const Gallery = (props: GalleryProps) => {
  const {data} = useGSL();
  const {width} = useWindowDimensions();
  const {filter, sort} = props;
  const [galleryData, setGalleryData] = useState<GSLCard[]>([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const selectedCard = useRef<GSLCard>(undefined);
  let galleryColNo = 2;

  if (width < Sizes.sm) {
    galleryColNo = 2;
  } else if (width >= Sizes.sm && width < Sizes.md) {
    galleryColNo = 3;
  } else if (width >= Sizes.md && width < Sizes.lg) {
    galleryColNo = 5;
  } else {
    galleryColNo = 6;
  }

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  useEffect(() => {
    if (data) {
      const cleanFilter = {...filter};
      Object.keys(cleanFilter).forEach((key) => {
        if (!cleanFilter[key]) {
          delete cleanFilter[key];
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
          if (cleanFilter[key]) {
            if (key === 'CharacterName') {
              if (
                !item[key]
                  .toLowerCase()
                  .includes(cleanFilter[key].toLowerCase())
              )
                return false;
            } else if (item[key] != cleanFilter[key]) return false;
          }
        }
        return true;
      });
      setGalleryData(sortData(filteredData, sort));
    }
  }, [data, filter, sort]);
  return (
    <>
      <SafeAreaView style={styles.galleryContainer}>
        <FlashList
          data={galleryData}
          numColumns={galleryColNo}
          keyExtractor={(item) => item.Code}
          estimatedItemSize={248}
          renderItem={({item}) => (
            <GalleryItem
              data={item}
              onPress={(item) => {
                selectedCard.current = item;
                toggleOverlay();
              }}
            />
          )}
        />
      </SafeAreaView>
      <Overlay isVisible={isOverlayVisible} toggleOverlay={toggleOverlay}>
        {selectedCard && <CardDetails data={selectedCard.current} />}
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    paddingBottom: Platform.select({web: 0, native: 10}),
    backgroundColor: Colors.background,
  },
});
