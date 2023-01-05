import {createTheme, ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LibraryView from './src/views/LibraryView';

const theme = createTheme({
  lightColors: {
    primary: '#293D50',
    secondary: '#A1B8CE',
    background: '#E9E9E9',
  },
  // darkColors: {
  //   primary: '#213140',
  //   secondary: '#4a5a6b',
  // },
  mode: 'light',
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <LibraryView />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
