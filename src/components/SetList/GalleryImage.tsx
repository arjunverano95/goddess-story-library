import {Image} from 'expo-image';
import React, {useCallback, useState} from 'react';
import {ImageStyle, StyleProp, View, ViewStyle} from 'react-native';

interface GalleryImageProps {
  imageUrl?: string;
  style: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const GalleryImage = React.memo<GalleryImageProps>((props) => {
  const {imageUrl, style, containerStyle} = props;
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const onLoadEnd = useCallback(() => {
    // Image loaded successfully
  }, []);

  const onError = useCallback(() => {
    setImageLoadFailed(true);
  }, []);

  return (
    <View style={containerStyle}>
      <Image
        style={[style, {resizeMode: undefined}]}
        source={
          !imageUrl || imageLoadFailed
            ? require('../../../assets/no-image.png')
            : {uri: imageUrl}
        }
        contentFit="cover"
        onError={onError}
        onLoad={onLoadEnd}
        transition={0}
        placeholder={require('../../../assets/no-image.png')}
        cachePolicy="memory-disk"
        recyclingKey={imageUrl}
        priority="normal"
      />
    </View>
  );
});

// Custom comparison function for React.memo
const areEqual = (
  prevProps: GalleryImageProps,
  nextProps: GalleryImageProps,
) => {
  return (
    prevProps.imageUrl === nextProps.imageUrl &&
    prevProps.style === nextProps.style &&
    prevProps.containerStyle === nextProps.containerStyle
  );
};

GalleryImage.displayName = 'GalleryImage';

export default React.memo(GalleryImage, areEqual);
