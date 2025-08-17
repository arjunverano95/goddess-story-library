import {Image} from 'expo-image';
import React, {useState} from 'react';
import {ImageStyle, StyleProp, View, ViewStyle} from 'react-native';

interface GalleryImageProps {
  imageUrl?: string;
  style: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const GalleryImage = (props: GalleryImageProps) => {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const onLoadEnd = () => {
    // Image loaded successfully
  };

  const onError = () => {
    setImageLoadFailed(true);
  };

  return (
    <View style={props.containerStyle}>
      <Image
        style={[props.style, {resizeMode: undefined}]}
        source={
          !props.imageUrl || imageLoadFailed
            ? require('../../../assets/no-image.png')
            : {uri: props.imageUrl}
        }
        contentFit="cover"
        onError={onError}
        onLoad={onLoadEnd}
        transition={150}
      />
    </View>
  );
};

export default GalleryImage;
