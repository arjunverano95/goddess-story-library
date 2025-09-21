import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Drawer} from 'expo-router/drawer';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {OfflineScreen} from '../src/components';
import CustomDrawerContent from '../src/components/CustomDrawerContent';
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
            <Drawer
              drawerContent={(props: any) => <CustomDrawerContent {...props} />}
              initialRouteName="index"
              screenOptions={{
                headerShown: false,
                drawerStyle: {
                  backgroundColor: '#fffdfd',
                  width: 300,
                },
                drawerType: 'front',
                swipeEnabled: true,
                swipeEdgeWidth: 50,
              }}
            >
              <Drawer.Screen
                name="index"
                options={{
                  title: 'Goddess Story',
                  drawerLabel: 'Goddess Story',
                }}
              />
              <Drawer.Screen
                name="[slug]/index"
                options={{
                  title: 'Dynamic Route',
                  drawerLabel: 'Dynamic Route',
                }}
              />
              <Drawer.Screen name="+not-found" />
            </Drawer>
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryProvider>
      </Animated.View>
    </SafeAreaProvider>
  );
}
