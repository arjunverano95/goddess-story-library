import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ImageSkeletonProps {
  style?: any;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({style}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, {duration: 1200}), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.skeleton, style, animatedStyle]}>
      <View style={styles.skeletonContent} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  skeletonContent: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default ImageSkeleton;
