import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Badge, Card, Text} from '@rneui/themed';

import {Colors} from '../../app/colors';
import {GoddessStory} from '../../models/GoddessStory';

interface GalleryProps {
  data: GoddessStory[];
}

export const Gallery = (props: GalleryProps) => {
  const {data} = props;

  return (
    <>
      <SafeAreaView style={styles.galleryContainer}>
        <FlatList
          data={data}
          style={styles.gallery}
          numColumns={2}
          keyExtractor={(item) => item.Code}
          renderItem={({item}) => (
            <Card containerStyle={styles.cardContainer}>
              <View>
                <Badge
                  containerStyle={styles.rarityBadgeContainer}
                  badgeStyle={styles.badge}
                  textStyle={styles.badgeText}
                  value={item.Rarity}
                  status="warning"
                />
                <Badge
                  containerStyle={styles.cardNumberBadgeContainer}
                  badgeStyle={styles.badge}
                  textStyle={styles.badgeText}
                  value={item.CardNumber}
                  status="success"
                />
                <FastImage
                  style={styles.image}
                  source={
                    !item.ImageUrl
                      ? require('../../../assets/no-image.png')
                      : {
                          uri: item.ImageUrl,
                          priority: FastImage.priority.normal,
                        }
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.cardTitleContainer}>
                  <Text
                    style={styles.cardTitle}
                  >{`${item.CharacterName}`}</Text>
                  <Text style={styles.cardSubTitle}>{item.SetNumber}</Text>
                </View>
                <View>
                  <Text style={styles.textContent}>{item.SeriesName}</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: Colors.background,
  },
  gallery: {
    flex: 1,
    width: '100%',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  cardContainer: {
    borderWidth: 0,
    shadowColor: Colors.transparent,
    maxWidth: '50%',
    flex: 1,
    margin: 0,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 0,
  },
  cardTitleContainer: {flexDirection: 'row'},
  rarityBadgeContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 999,
  },
  cardNumberBadgeContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999,
  },
  badge: {
    height: 20,
    minWidth: 40,
    paddingHorizontal: 1,
    marginRight: 5,
    fontSize: 9,
  },
  badgeText: {fontWeight: 'bold'}, // alignSelf: 'flex-start'}
  cardTitle: {flex: 1, textAlign: 'left', fontSize: 12},
  cardSubTitle: {textAlign: 'right', fontSize: 12, fontWeight: 'bold'},
  textContent: {fontSize: 11, color: Colors.greyOutline},
  cardFooter: {paddingHorizontal: 8, paddingVertical: 3},
});
