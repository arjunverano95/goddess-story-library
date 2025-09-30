import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {MaterialIcons} from '@expo/vector-icons';
import {Colors} from '../constants';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
}

const Header = (props: HeaderProps) => {
  const {children, showBackButton, title} = props;
  const navigation = useNavigation();

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
        showBackButton ? {backgroundColor: Colors.background} : {},
      ]}
    >
      <View style={styles.headerContent}>
        {showBackButton && (
          <Animated.View style={backAnimatedStyle}>
            <TouchableOpacity
              style={styles.toggleDrawerContainer}
              onPress={handleBackPress}
            >
              <MaterialIcons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
          </Animated.View>
        )}

        {title ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : null}

        {children ? (
          <View style={styles.headerContentContainer}>{children}</View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.black,
  },
  toggleDrawerContainer: {
    marginTop: 5,
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
