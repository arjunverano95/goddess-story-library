import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'expo-image';

import {Colors} from '../../../constants';
import {GSLCard} from '../../../models/GSLCard';

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
    return (
      <View style={styles.noImageContainer}>
        <Image
          style={styles.noImage}
          source={require('../../../../assets/no-image.png')}
          contentFit="contain"
        />
      </View>
    );
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
  noImageContainer: {
    flex: 1,
    margin: 15,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImage: {
    width: 100,
    height: 100,
    opacity: 0.5,
  },
});

export default CardDetailImage;
