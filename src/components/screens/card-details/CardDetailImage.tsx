import {Image} from 'expo-image';
import React from 'react';
import {Platform} from 'react-native';
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
          style={{flex: 1}}
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

// Removed StyleSheet in favor of inline styles

export default CardDetailImage;
