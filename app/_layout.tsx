import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Tabs} from 'expo-router';
import {Icon, OfflineScreen} from '../src/components';
import {useNetworkStatus} from '../src/hooks';
import {QueryProvider} from '../src/providers/QueryProvider';

// Suppress pointerEvents deprecation warning
if (__DEV__) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      (args[0].includes('props.pointerEvents is deprecated') ||
        args[0].includes('"shadow*" style props are deprecated'))
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

export default function RootLayout() {
  const {isOffline, isChecking, checkNetworkStatus} = useNetworkStatus();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // Show offline screen when there's no internet connection
  if (isOffline) {
    return (
      <SafeAreaProvider>
        <OfflineScreen onRetry={checkNetworkStatus} isRetrying={isChecking} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Animated.View
        style={{flex: 1}}
        entering={FadeIn.duration(500).delay(100)}
      >
        <QueryProvider>
          <ThemeProvider value={DefaultTheme}>
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  height: 55,
                },
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: 'Home',
                  tabBarIcon: ({size, color, focused}) => (
                    <Icon
                      name="home"
                      size={size}
                      color={color}
                      focused={focused}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="cards"
                options={{
                  title: 'Cards',
                  tabBarIcon: ({size, color, focused}) => (
                    <Icon
                      name="grid"
                      size={size}
                      color={color}
                      focused={focused}
                    />
                  ),
                }}
              />

              <Tabs.Screen
                name="favorites"
                options={{
                  title: 'Favorites',
                  tabBarIcon: ({size, color, focused}) => (
                    <Icon
                      name="heart"
                      size={size}
                      color={color}
                      focused={focused}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="profile"
                options={{
                  title: 'Profile',
                  tabBarIcon: ({size, color, focused}) => (
                    <Icon
                      name="person"
                      size={size}
                      color={color}
                      focused={focused}
                    />
                  ),
                }}
              />
            </Tabs>
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryProvider>
      </Animated.View>
    </SafeAreaProvider>
  );
}
