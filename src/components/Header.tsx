import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {Button, Icon} from '@rneui/themed';

import {Colors, Icons} from '../constants';

type DrawerParamList = {
  index: undefined;
  'goddess-story': undefined;
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
    <View
      style={[
        styles.headerContainer,
        showBackButton ? {backgroundColor: Colors.transparent} : {},
      ]}
    >
      {showBackButton ? (
        <Animated.View style={backAnimatedStyle}>
          <Button
            containerStyle={styles.toggleDrawerContainer}
            buttonStyle={styles.toggleDrawerButton}
            type="clear"
            onPress={handleBackPress}
          >
            <Icon name={Icons.arrow_left} color={Colors.black} />
          </Button>
        </Animated.View>
      ) : (
        <Animated.View style={menuAnimatedStyle}>
          <Button
            containerStyle={styles.toggleDrawerContainer}
            buttonStyle={styles.toggleDrawerButton}
            type="clear"
            onPress={handleMenuPress}
          >
            <Icon name={Icons.menu} color="white" />
          </Button>
        </Animated.View>
      )}

      {children && (
        <View style={styles.headerContentContainer}>{props.children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.headerBg,
    flexDirection: 'row',
  },
  toggleDrawerContainer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  toggleDrawerButton: {
    height: 46,
  },
  headerContentContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
  },
});

export default Header;
