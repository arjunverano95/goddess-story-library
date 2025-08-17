import * as Haptics from 'expo-haptics';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {Badge, Card, Text} from '@rneui/themed';

import {Colors} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import GalleryImage from './GalleryImage';

interface GalleryItemProps {
  data: GSLCard;
  onPress: (value: GSLCard) => void;
}

const GalleryItem = (props: GalleryItemProps) => {
  const {data, onPress} = props;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {damping: 15, stiffness: 300});
    opacity.value = withTiming(0.8, {duration: 100});
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 300});
    opacity.value = withTiming(1, {duration: 100});
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <Animated.View style={[styles.cardWrapper, animatedStyle]}>
        <Pressable
          onPress={() => {
            onPress(data);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.pressable}
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
            <GalleryImage style={styles.image} imageUrl={data.ImageUrl} />
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
      </Animated.View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  cardContainer: {
    borderWidth: 0,
    shadowColor: Colors.transparent,
    //width: 160,
    margin: 5,
    padding: 0,
  },
  cardTitleContainer: {
    flexDirection: 'row',
  },
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
  badgeText: {
    fontWeight: 'bold',
  },
  cardTitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
  },
  cardSubTitle: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: 11,
    color: Colors.greyOutline,
  },
  cardFooter: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

export default GalleryItem;
