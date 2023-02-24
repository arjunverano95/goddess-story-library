import React, {useEffect} from 'react';
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
  else {
    useEffect(() => {
      history.pushState(
        null,
        '',
        `#gsc.tab=1&gsc.q=${data.SeriesName} ${data.CharacterName}`,
      );
      const script = document.createElement('script');
      document.head.append(script);
      script.src = `https://cse.google.com/cse.js?cx=64bb5bd8971ac4f24`;

      return () => {
        script.remove();
      };
    }, []);
    return (
      <>
        <View style={styles.imageWebview}>
          <div className="gcse-searchresults-only"></div>
        </View>
      </>
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
    resizeMode: 'contain',
    width: null,
  },
  imageWebview: {
    flex: 1,
    margin: 20,
    backgroundColor: Colors.white,
    borderWidth: 0,
    overflowY: 'auto',
  },
});
export default CardImage;
