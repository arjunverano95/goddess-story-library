import {Image} from 'expo-image';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {Colors} from '../../../constants';
import {GSLCard} from '../../../models/GSLCard';
import MobileWebView from './MobileWebView';
import WebSearchIframe from './WebSearchIframe';

interface CardDetailImageProps {
  data: GSLCard;
}

const CardDetailImage = (props: CardDetailImageProps) => {
  const {data} = props;

  if (data.ImageUrl) {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: data.ImageUrl}}
          contentFit="contain"
        />
      </View>
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
  imageContainer: {
    flex: 1,
    margin: 15,
    backgroundColor: Colors.white,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
});

export default CardDetailImage;
