import * as Haptics from 'expo-haptics';
import React from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedPressableProps extends PressableProps {
  children: React.ReactNode;
  hapticFeedback?: boolean;
  scaleOnPress?: boolean;
  opacityOnPress?: boolean;
}

const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  hapticFeedback = true,
  scaleOnPress = true,
  opacityOnPress = true,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: scaleOnPress ? [{scale: scale.value}] : [],
      opacity: opacityOnPress ? opacity.value : 1,
    };
  });

  const handlePressIn = (event: any) => {
    if (scaleOnPress) {
      scale.value = withSpring(0.95, {damping: 15, stiffness: 300});
    }
    if (opacityOnPress) {
      opacity.value = withTiming(0.8, {duration: 100});
    }
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    if (scaleOnPress) {
      scale.value = withSpring(1, {damping: 15, stiffness: 300});
    }
    if (opacityOnPress) {
      opacity.value = withTiming(1, {duration: 100});
    }
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        {...props}
        style={[styles.pressable, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
});

export default AnimatedPressable;
