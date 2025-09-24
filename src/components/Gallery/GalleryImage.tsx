import {Image} from 'expo-image';
import React, {useCallback, useEffect, useState} from 'react';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface GalleryImageProps {
  imageUrl?: string;
  style: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const FADE_MS = 260;
const EASE = Easing.out(Easing.cubic);

const GalleryImage = React.memo<GalleryImageProps>((props) => {
  const {imageUrl, style, containerStyle} = props;
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  // Animated values
  const realOpacity = useSharedValue(0);
  const realScale = useSharedValue(0.985);
  const placeholderOpacity = useSharedValue(1);

  // Reset animation whenever the URL changes
  useEffect(() => {
    setImageLoadFailed(false);
    realOpacity.value = 0;
    realScale.value = 0.985;
    placeholderOpacity.value = 1;
  }, [imageUrl, placeholderOpacity, realOpacity, realScale]);

  const onError = useCallback(() => {
    setImageLoadFailed(true);
    // Crossfade to fallback immediately (still animate)
    realOpacity.value = withTiming(1, {duration: FADE_MS, easing: EASE});
    realScale.value = withTiming(1, {duration: FADE_MS, easing: EASE});
    placeholderOpacity.value = withTiming(0, {duration: FADE_MS, easing: EASE});
  }, [placeholderOpacity, realOpacity, realScale]);

  const onLoad = useCallback(() => {
    // Real image loaded: fade/scale in, fade placeholder out
    realOpacity.value = withTiming(1, {duration: FADE_MS, easing: EASE});
    realScale.value = withTiming(1, {duration: FADE_MS, easing: EASE});
    placeholderOpacity.value = withTiming(0, {duration: FADE_MS, easing: EASE});
  }, [placeholderOpacity, realOpacity, realScale]);

  const realStyle = useAnimatedStyle(() => ({
    opacity: realOpacity.value,
    transform: [{scale: realScale.value}],
  }));

  const phStyle = useAnimatedStyle(() => ({
    opacity: placeholderOpacity.value,
  }));

  const realSource =
    !imageUrl || imageLoadFailed
      ? require('../../../assets/no-image.png')
      : {uri: imageUrl};

  return (
    <Animated.View entering={FadeIn.duration(200)} style={containerStyle}>
      {/* Placeholder layer */}
      <Animated.View style={[{position: 'absolute', inset: 0}, phStyle]}>
        <Image
          style={[style, {resizeMode: undefined}]}
          source={require('../../../assets/placeholder.png')}
          contentFit="cover"
          // Keep transition = 0; we control crossfade via Reanimated
          transition={0}
          cachePolicy="memory-disk"
          priority="low"
        />
      </Animated.View>

      {/* Real image (remote or fallback) */}
      <Animated.View style={[realStyle]}>
        <Image
          style={[style, {resizeMode: undefined}]}
          source={realSource}
          contentFit="cover"
          onError={onError}
          onLoad={onLoad}
          transition={0} // disable internal crossfade, we animate ourselves
          cachePolicy="memory-disk"
          recyclingKey={imageUrl}
          priority="normal"
        />
      </Animated.View>
    </Animated.View>
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
