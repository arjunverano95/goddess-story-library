import {createTheme, ThemeProvider} from '@rneui/themed';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {LogBox} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LightColors, Colors} from './src/app/colors';
import DrawerNavigation from './src/components/Navigation/DrawerNavigation';

const theme = createTheme({
  lightColors: LightColors,
  mode: 'light',
  components: {
    Header: {
      backgroundColor: Colors.headerBg,
    },
    Icon: {
      color: Colors.black,
    },
  },
});
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar
        backgroundColor={Colors.headerBg}
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
