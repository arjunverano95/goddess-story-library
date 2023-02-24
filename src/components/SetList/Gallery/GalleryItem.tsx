import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Badge, Card, Text} from '@rneui/themed';

import {Colors} from '../../../app/constants';
import {GoddessStory} from '../../../models/GoddessStory';

interface GalleryItemProps {
  data: GoddessStory;
  onPress: (value: GoddessStory) => void;
}
const GalleryItem = (props: GalleryItemProps) => {
  const {data, onPress} = props;
  return (
    <Card containerStyle={styles.cardContainer}>
      <Pressable
        onPress={() => {
          onPress(data);
        }}
      >
        <View>
          <Badge
            containerStyle={styles.setNoBadgeContainer}
            badgeStyle={styles.badge}
            textStyle={styles.badgeText}
            value={data.SetNumber}
            status="warning"
          />
          <Badge
            containerStyle={styles.cardNoBadgeContainer}
            badgeStyle={styles.badge}
            textStyle={styles.badgeText}
            value={data.CardNumber}
            status="success"
          />
          <FastImage
            style={styles.image}
            defaultSource={require('../../../../assets/no-image.png')}
            source={
              !data.ImageUrl
                ? require('../../../../assets/no-image.png')
                : {
                    uri: data.ImageUrl,
                    priority: FastImage.priority.normal,
                  }
            }
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{`${data.CharacterName}`}</Text>
            <Text style={styles.cardSubTitle}>{data.Rarity}</Text>
          </View>
          <View>
            <Text style={styles.textContent}>{data.SeriesName}</Text>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};
const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  cardContainer: {
    borderWidth: 0,
    shadowColor: Colors.transparent,
    // maxWidth: '50%',
    flex: 1,
    margin: 0,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 0,
  },
  cardTitleContainer: {flexDirection: 'row'},
  setNoBadgeContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 999,
  },
  cardNoBadgeContainer: {
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
export default GalleryItem;
