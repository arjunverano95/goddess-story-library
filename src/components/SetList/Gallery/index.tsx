import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FlashList} from '@shopify/flash-list';

import {Colors} from '../../../app/colors';
import {GoddessStory} from '../../../models/GoddessStory';
import CardDetails from '../../CardDetails';
import Overlay from '../../Overlay';
import GalleryItem from './GalleryItem';

const data: GoddessStory[] = require('../../../app/data.json');

interface GalleryProps {
  filter: GoddessStory;
  sort: 'asc' | 'desc';
}

export const Gallery = (props: GalleryProps) => {
  const {filter, sort} = props;
  const cleanFilter = {...filter};
  Object.keys(cleanFilter).forEach((key) => {
    if (!cleanFilter[key]) {
      delete cleanFilter[key];
    }
  });
  const sortData = (data: GoddessStory[], order: 'asc' | 'desc') => {
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
          if (!item[key].toLowerCase().includes(cleanFilter[key].toLowerCase()))
            return false;
        } else if (item[key] != cleanFilter[key]) return false;
      }
    }
    return true;
  });
  const galleryData = sortData(filteredData, sort);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const selectedCard = useRef<GoddessStory>(undefined);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <>
      <SafeAreaView style={styles.galleryContainer}>
        <FlashList
          data={galleryData}
          numColumns={2}
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
    paddingBottom: 10,
    backgroundColor: Colors.background,
  },
});
