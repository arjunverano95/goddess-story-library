import {createTheme, ThemeProvider} from '@rneui/themed';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import LibraryView from './src/views/LibraryView';

const theme = createTheme({
  lightColors: {
    primary: '#e85d64',
    secondary: '#f2a4a8',
    background: '#fffdfd',
  },
  mode: 'light',
});
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar translucent={true}></StatusBar>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <LibraryView />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
