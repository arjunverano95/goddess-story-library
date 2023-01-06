import {createTheme, ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LibraryView from './src/views/LibraryView';
import TextToSpeech from './TextToSpeech';

const theme = createTheme({
  lightColors: {
    primary: '#e85d64',
    secondary: '#f2a4a8',
    background: '#fffdfd',
  },
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
