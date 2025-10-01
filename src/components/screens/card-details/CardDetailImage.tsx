import {Image} from 'expo-image';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {YStack} from 'tamagui';
import {MobileWebView, WebSearchIframe} from '.';
import {GSLCard} from '../../../models/GSLCard';

interface CardDetailImageProps {
  data: GSLCard;
}

const CardDetailImage = (props: CardDetailImageProps) => {
  const {data} = props;

  if (data.ImageUrl) {
    return (
      <YStack flex={1} margin={15} backgroundColor="$cardBg">
        <Image
          style={styles.image}
          source={{uri: data.ImageUrl}}
          contentFit="contain"
        />
      </YStack>
    );
  } else {
    // Use platform-specific components
    if (Platform.OS === 'web') {
      return <WebSearchIframe data={data} />;
    } else {
      return <MobileWebView data={data} />;
    }
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null,
  },
});

export default CardDetailImage;
