import {createTheme, ThemeProvider} from '@rneui/themed';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {LogBox} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawerNavigation from './src/components/Navigation/DrawerNavigation';

const theme = createTheme({
  lightColors: {
    primary: '#e85d64',
    secondary: '#f2a4a8',
    background: '#fffdfd',
  },
  mode: 'light',
  components: {
    Header: {
      backgroundColor: '#393e42',
    },
  },
});
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar translucent={true}></StatusBar>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <DrawerNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
