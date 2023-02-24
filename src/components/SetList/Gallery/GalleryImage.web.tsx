import React from 'react';
import {Image, ImageStyle, StyleProp, ViewStyle} from 'react-native';

interface GalleryImageProps {
  imageUrl?: string;
  style: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const GalleryImage = (props: GalleryImageProps) => {
  return (
    <Image
      style={props.style}
      source={
        !props.imageUrl
          ? require('../../../../assets/no-image.png')
          : {
              uri: props.imageUrl,
            }
      }
      resizeMode={'cover'}
    />
  );
};

export default GalleryImage;
