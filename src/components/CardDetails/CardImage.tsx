import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import WebView from 'react-native-webview';

import {Colors} from '../../app/constants';
import {GoddessStory} from '../../models/GoddessStory';

interface CardImageProps {
  data: GoddessStory;
}

const CardImage = (props: CardImageProps) => {
  const {data} = props;

  if (data.ImageUrl)
    return (
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: data.ImageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  else
    return (
      <>
        <WebView
          style={styles.imageWebview}
          source={{
            uri: `https://images.google.com/images?q=${data.SeriesName} ${data.CharacterName}`,
          }}
        />
      </>
    );
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
    resizeMode: 'contain',
    width: null,
  },
  imageWebview: {flex: 1, margin: 20, backgroundColor: Colors.white},
});
export default CardImage;
