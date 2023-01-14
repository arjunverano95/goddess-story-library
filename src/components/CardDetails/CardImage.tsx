import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import WebView from 'react-native-webview';

import {useNetInfo} from '@react-native-community/netinfo';

import {Colors} from '../../app/colors';
import {GoddessStory} from '../../models/GoddessStory';

interface CardImageProps {
  data: GoddessStory;
}

const CardImage = (props: CardImageProps) => {
  const {data} = props;
  const netInfo = useNetInfo();

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
        {netInfo.isConnected && (
          <WebView
            style={styles.imageWebview}
            source={{
              uri: `http://images.google.com/images?q=${data.SeriesName} ${data.CharacterName}`,
            }}
          />
        )}
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
  imageWebview: {flex: 1, margin: 20},
});
export default CardImage;
