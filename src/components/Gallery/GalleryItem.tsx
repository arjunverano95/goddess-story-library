import * as Haptics from 'expo-haptics';
import React, {useCallback, useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {Text, YStack, useTheme} from 'tamagui';

import {GSLCard} from '../../models/GSLCard';
import GalleryImage from './GalleryImage';

interface GalleryItemProps {
  data: GSLCard;
  onPress: (data: GSLCard) => void;
}

const GalleryItem = React.memo<GalleryItemProps>((props) => {
  const {data, onPress} = props;
  const theme = useTheme();
  const handlePressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

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
    <YStack style={styles.cardContainer}>
      <Animated.View style={[styles.cardWrapper]}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressIn}
          style={styles.pressable}
        >
          <YStack>
            <YStack
              position="absolute"
              top={5}
              left={10}
              zIndex={999}
              height={20}
              minWidth={40}
              paddingHorizontal={6}
              alignItems="center"
              justifyContent="center"
              backgroundColor={theme.primary?.val as any}
              borderRadius={6}
            >
              <Text fontSize={10} fontWeight="700" color="#fff">
                {badgeValues.setNumber}
              </Text>
            </YStack>
            <YStack
              position="absolute"
              top={5}
              right={5}
              zIndex={999}
              height={20}
              minWidth={40}
              paddingHorizontal={6}
              alignItems="center"
              justifyContent="center"
              backgroundColor={theme.secondary?.val as any}
              borderRadius={6}
            >
              <Text fontSize={10} fontWeight="700" color="#fff">
                {badgeValues.cardNumber}
              </Text>
            </YStack>
            <GalleryImage style={styles.image} imageUrl={data.ImageUrl} />
          </YStack>
          <YStack style={styles.cardFooter}>
            <YStack style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{badgeValues.characterName}</Text>
              <Text style={styles.cardSubTitle}>{badgeValues.rarity}</Text>
            </YStack>
            <YStack>
              <Text style={[styles.textContent, {color: theme.muted?.val}]}>
                {badgeValues.seriesName}
              </Text>
            </YStack>
          </YStack>
        </Pressable>
      </Animated.View>
    </YStack>
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
