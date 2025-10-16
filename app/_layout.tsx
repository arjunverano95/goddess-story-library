import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: false}} initialRouteName="index">
        {/* <Stack.Screen name="(tabs)" /> */}
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
