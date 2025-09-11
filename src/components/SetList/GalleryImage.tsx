import {Image} from 'expo-image';
import React, {useCallback, useState} from 'react';
import {ImageStyle, StyleProp, View, ViewStyle} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

interface GalleryImageProps {
  imageUrl?: string;
  style: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const GalleryImage = React.memo<GalleryImageProps>((props) => {
  const {imageUrl, style, containerStyle} = props;
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const onError = useCallback(() => {
    setImageLoadFailed(true);
  }, []);

  return (
    <View style={containerStyle}>
      {/* Show skeleton while loading */}
      {/* {isLoading && imageUrl && !imageLoadFailed && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <ImageSkeleton style={style} />
        </Animated.View>
      )} */}

      {/* Image with smooth transition */}
      <Animated.View entering={FadeIn.duration(300)}>
        <Image
          style={[style, {resizeMode: undefined}]}
          source={
            !imageUrl || imageLoadFailed
              ? require('../../../assets/no-image.png')
              : {uri: imageUrl}
          }
          contentFit="cover"
          onError={onError}
          transition={0}
          placeholder={require('../../../assets/no-image.png')}
          cachePolicy="memory-disk"
          recyclingKey={imageUrl}
          priority="normal"
        />
      </Animated.View>
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
