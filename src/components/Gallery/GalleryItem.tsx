import * as Haptics from 'expo-haptics';
import React, {useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Badge, Text} from 'react-native-elements';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {Colors} from '../../constants';
import {GSLCard} from '../../models/GSLCard';
import GalleryImage from './GalleryImage';

interface GalleryItemProps {
  data: GSLCard;
  onPress: (data: GSLCard) => void;
}

const GalleryItem = React.memo<GalleryItemProps>((props) => {
  const {data, onPress} = props;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, {damping: 15, stiffness: 300});
    opacity.value = withTiming(0.8, {duration: 100});
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [scale, opacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, {damping: 15, stiffness: 300});
    opacity.value = withTiming(1, {duration: 100});
  }, [scale, opacity]);

  const handlePress = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  // Memoize badge values to prevent unnecessary re-renders
  const badgeValues = useMemo(
    () => ({
      setNumber: data.SetNumber,
      cardNumber: data.CardNumber,
      characterName: data.CharacterName,
      rarity: data.Rarity,
      seriesName: data.SeriesName,
    }),
    [
      data.SetNumber,
      data.CardNumber,
      data.CharacterName,
      data.Rarity,
      data.SeriesName,
    ],
  );

  return (
    <div style={styles.cardContainer}>
      <Animated.View style={[styles.cardWrapper, animatedStyle]}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.pressable}
        >
          <View>
            <Badge
              containerStyle={styles.setNoBadgeContainer}
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={badgeValues.setNumber}
              status="warning"
            />
            <Badge
              containerStyle={styles.cardNoBadgeContainer}
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={badgeValues.cardNumber}
              status="success"
            />
            <GalleryImage style={styles.image} imageUrl={data.ImageUrl} />
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{badgeValues.characterName}</Text>
              <Text style={styles.cardSubTitle}>{badgeValues.rarity}</Text>
            </View>
            <View>
              <Text style={styles.textContent}>{badgeValues.seriesName}</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </div>
  );
});

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
    //width: 160,
    margin: 0,
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

// Custom comparison function for React.memo
const areEqual = (prevProps: GalleryItemProps, nextProps: GalleryItemProps) => {
  // Compare the essential data properties
  return (
    prevProps.data.ID === nextProps.data.ID &&
    prevProps.data.Code === nextProps.data.Code &&
    prevProps.data.CharacterName === nextProps.data.CharacterName &&
    prevProps.data.SeriesName === nextProps.data.SeriesName &&
    prevProps.data.Rarity === nextProps.data.Rarity &&
    prevProps.data.ImageUrl === nextProps.data.ImageUrl &&
    prevProps.data.SetNumber === nextProps.data.SetNumber &&
    prevProps.data.CardNumber === nextProps.data.CardNumber &&
    prevProps.onPress === nextProps.onPress
  );
};

GalleryItem.displayName = 'GalleryItem';

export default React.memo(GalleryItem, areEqual);
