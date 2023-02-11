import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

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
        <Image
          style={styles.image}
          source={{
            uri: data.ImageUrl,
          }}
          resizeMode={'contain'}
        />
      </View>
    );
  else
    return (
      <>
        <iframe
          style={styles.imageWebview}
          src={`http://images.google.com/images?q=${data.SeriesName} ${data.CharacterName}`}
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
  imageWebview: {
    flex: 1,
    margin: 20,
    backgroundColor: Colors.white,
    borderWidth: 0,
  },
});
export default CardImage;
