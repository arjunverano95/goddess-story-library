import {createTheme, ThemeProvider} from '@rneui/themed';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {LogBox} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {lightColors, colors} from './src/app/colors';
import DrawerNavigation from './src/components/Navigation/DrawerNavigation';

const theme = createTheme({
  lightColors: lightColors,
  mode: 'light',
  components: {
    Header: {
      backgroundColor: colors.headerBg,
    },
  },
});
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar
        backgroundColor={colors.headerBg}
        translucent={false}
      ></StatusBar>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <DrawerNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
