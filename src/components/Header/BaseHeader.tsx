import {useNavigation} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
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
      style={{
        paddingTop: Platform.OS === 'web' ? 0 : 20,
        backgroundColor: theme.primary?.val as any,
        borderBottomWidth: 1,
        borderBottomColor: theme.primary?.val as any,
      }}
    >
      <YStack style={{flexDirection: 'row'}}>
        {left ? (
          <YStack>{left}</YStack>
        ) : showBackButton ? (
          <Animated.View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginHorizontal: 5,
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
              activeOpacity={0.8}
              onPress={handleBackPress}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        ) : null}

        {title ? (
          <YStack style={{flex: 1, paddingLeft: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 16,
                color: 'white',
              }}
            >
              {title}
            </Text>
          </YStack>
        ) : null}

        {children ? (
          <YStack
            style={{padding: 0, margin: 0, flex: 1, flexDirection: 'row'}}
          >
            {children}
          </YStack>
        ) : null}

        {right ? (
          <YStack style={{justifyContent: 'center', alignItems: 'center'}}>
            {right}
          </YStack>
        ) : null}
      </YStack>
    </YStack>
  );
};

export default Header;
