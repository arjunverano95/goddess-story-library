import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';

import {MaterialIcons} from '@expo/vector-icons';
import {Text, YStack, useTheme} from 'tamagui';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onBackPress?: () => void;
}

const Header = (props: HeaderProps) => {
  const {children, showBackButton, title, left, right, onBackPress} = props;
  const navigation = useNavigation();
  const theme = useTheme();

  const handleBackPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <YStack
      style={[
        styles.headerContainer,
        showBackButton ? {backgroundColor: theme.bg?.val} : {},
      ]}
    >
      <YStack style={styles.headerContent}>
        {left ? (
          <YStack>{left}</YStack>
        ) : showBackButton ? (
          <Animated.View>
            <TouchableOpacity
              style={styles.toggleDrawerContainer}
              activeOpacity={0.8}
              onPress={handleBackPress}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={theme.color?.val || '#43484d'}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : null}

        {title ? (
          <YStack style={styles.titleContainer}>
            <Text
              style={[styles.title, {color: theme.color?.val || '#43484d'}]}
            >
              {title}
            </Text>
          </YStack>
        ) : null}

        {children ? (
          <YStack style={styles.headerContentContainer}>{children}</YStack>
        ) : null}

        {right ? (
          <YStack style={styles.menuButtonWrapper}>{right}</YStack>
        ) : null}
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'web' ? 0 : 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
  },
  menuButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#43484d',
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
