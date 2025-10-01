import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TamaguiProvider, YStack} from 'tamagui';

import {Stack} from 'expo-router';
// removed duplicate tamagui import
import {useColorScheme} from 'react-native';
import {OfflineScreen} from '../src/components';
import {useNetworkStatus} from '../src/hooks';
import {QueryProvider} from '../src/providers/QueryProvider';
import {config} from '../tamagui.config';

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
  const colorScheme = useColorScheme();
  const {isOffline, isChecking, checkNetworkStatus} = useNetworkStatus();
  // Fonts are embedded via app.json expo-font plugin; no runtime loading

  // Show offline screen when there's no internet connection
  if (isOffline) {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <OfflineScreen onRetry={checkNetworkStatus} isRetrying={isChecking} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <YStack flex={1} animation="quick" enterStyle={{opacity: 0, y: 10}}>
            <QueryProvider>
              <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <Stack
                  screenOptions={{headerShown: false}}
                  initialRouteName="(tabs)"
                >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="card-details"
                    options={{presentation: 'card'}}
                  />
                </Stack>
                <StatusBar style="auto" />
              </ThemeProvider>
            </QueryProvider>
          </YStack>
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
