import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Drawer} from 'expo-router/drawer';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {createTheme, ThemeProvider as RNEUIThemeProvider} from '@rneui/themed';

import {useColorScheme} from '@/hooks/useColorScheme';
import CustomDrawerContent from '../src/components/CustomDrawerContent';
import {Colors} from '../src/constants';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const rneuiTheme = createTheme({
    lightColors: {
      primary: Colors.primary,
      secondary: Colors.secondary,
      background: Colors.background,
      grey5: Colors.greyOutline,
    },
    mode: 'light',
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <RNEUIThemeProvider theme={rneuiTheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props: any) => <CustomDrawerContent {...props} />}
          initialRouteName="goddess-story"
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
            name="goddess-story"
            options={{
              title: 'Goddess Story',
              drawerLabel: 'Goddess Story',
            }}
          />
          <Drawer.Screen
            name="senpai-goddess-haven"
            options={{
              title: 'Senpai Goddess Haven',
              drawerLabel: 'Senpai Goddess Haven',
            }}
          />
          <Drawer.Screen name="+not-found" />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </RNEUIThemeProvider>
  );
}
