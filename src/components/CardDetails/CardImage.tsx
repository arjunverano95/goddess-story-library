import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import WebView from 'react-native-webview';

import {Colors, GSLBaseUrl} from '../../app/constants';
import {GSLCard} from '../../models/GSLCard';

interface CardImageProps {
  data: GSLCard;
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
          injectedJavaScript={`document.querySelectorAll('.gsc-positioningWrapper').forEach(el=> el.style.display = 'none')`}
          style={styles.imageWebview}
          source={{
            uri: `${GSLBaseUrl}/cse.html#gsc.tab=1&gsc.q=${data.SeriesName} ${data.CharacterName}`,
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
