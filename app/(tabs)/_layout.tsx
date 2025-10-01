import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';
import {useTheme} from 'tamagui';
import {Icon} from '../../src/components';

export default function TabsLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: Platform.OS === 'web' ? 0 : 10,
          height: Platform.OS === 'web' ? 50 : 100,
          backgroundColor: theme.cardBg ? theme.cardBg.val : undefined,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="home" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="grid" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="heart" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="person" size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
