import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Colors} from '../../constants';

interface SkeletonItemProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

const SkeletonItem = React.memo<SkeletonItemProps>((props) => {
  const {width = 160, height = 200, borderRadius = 8, style} = props;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const animatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          ...animatedStyle,
        },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.greyOutline,
  },
});

// Custom comparison function for React.memo
const areEqual = (
  prevProps: SkeletonItemProps,
  nextProps: SkeletonItemProps,
) => {
  return (
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.borderRadius === nextProps.borderRadius
  );
};

SkeletonItem.displayName = 'SkeletonItem';

export default React.memo(SkeletonItem, areEqual);
