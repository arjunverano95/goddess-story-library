import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MaterialIcons} from '@expo/vector-icons';

import {Colors} from '../constants';

type DrawerParamList = {
  index: undefined;
  'senpai-goddess-haven': undefined;
};

type DrawerNavigation = DrawerNavigationProp<DrawerParamList>;

interface HeaderProps {
  children?: React.ReactNode;
  showBackButton?: boolean;
}

const Header = (props: HeaderProps) => {
  const {children, showBackButton} = props;
  const navigation = useNavigation<DrawerNavigation>();

  const menuScale = useSharedValue(1);
  const backScale = useSharedValue(1);

  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: menuScale.value}],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: backScale.value}],
    };
  });

  const handleMenuPress = () => {
    menuScale.value = withSpring(0.9, {damping: 15, stiffness: 300});
    setTimeout(() => {
      menuScale.value = withSpring(1, {damping: 15, stiffness: 300});
    }, 100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.openDrawer();
  };

  const handleBackPress = async () => {
    backScale.value = withSpring(0.9, {damping: 15, stiffness: 300});
    setTimeout(() => {
      backScale.value = withSpring(1, {damping: 15, stiffness: 300});
    }, 100);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        styles.headerContainer,
        showBackButton ? {backgroundColor: Colors.transparent} : {},
      ]}
      edges={['top']}
    >
      <View style={styles.headerContent}>
        {showBackButton ? (
          <Animated.View style={backAnimatedStyle}>
            <TouchableOpacity
              style={styles.toggleDrawerContainer}
              onPress={handleBackPress}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View style={menuAnimatedStyle}>
            <TouchableOpacity
              style={styles.toggleDrawerContainer}
              onPress={handleMenuPress}
            >
              <MaterialIcons name="menu" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {children && (
          <View style={styles.headerContentContainer}>{props.children}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.headerBg,
  },
  headerContent: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  toggleDrawerContainer: {
    marginTop: 10,
    marginHorizontal: 5,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerContentContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
  },
});

export default Header;
