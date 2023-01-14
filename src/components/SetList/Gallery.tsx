import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Badge, Card, Text} from '@rneui/themed';

import {Colors} from '../../app/colors';
import {GoddessStory} from '../../models/GoddessStory';

const data: GoddessStory[] = require('../../app/data.json');

interface GalleryProps {
  params: GoddessStory;
}

export const Gallery = (props: GalleryProps) => {
  const formattedData = data.sort((a, b) => {
    return (
      a.SetNumber.localeCompare(b.SetNumber) ||
      Number(a.CardNumber) - Number(b.CardNumber)
    );
  });
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={formattedData}
          style={styles.list}
          numColumns={2}
          keyExtractor={(item) => item.Code}
          renderItem={({item}) => (
            <Card containerStyle={styles.cardContainer}>
              <View>
                <Badge
                  containerStyle={styles.rarityBadgeContainer}
                  badgeStyle={styles.rarityBadge}
                  textStyle={styles.raritytext}
                  value={item.CardNumber}
                  status="warning"
                />
                <FastImage
                  style={styles.item}
                  source={
                    item.ImageUrl === ''
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
  list: {
    width: '100%',
    backgroundColor: Colors.background,
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  cardContainer: {
    borderWidth: 0,
    borderColor: Colors.transparent,
    width: '100%',
    flex: 1,
    margin: 0,
    paddingHorizontal: 5,
    paddingBottom: 0,
  },
  cardTitleContainer: {flexDirection: 'row'},
  rarityBadgeContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999,
  },
  rarityBadge: {
    height: 20,
    minWidth: 40,
    paddingHorizontal: 1,
    marginRight: 5,
    fontSize: 9,
  },
  raritytext: {fontWeight: 'bold'}, // alignSelf: 'flex-start'}
  cardTitle: {flex: 1, textAlign: 'left', fontSize: 12},
  cardSubTitle: {textAlign: 'right', fontSize: 12, fontWeight: 'bold'},
  textContent: {fontSize: 11, color: Colors.greyOutline},
  cardFooter: {paddingHorizontal: 8, paddingTop: 3},
});
