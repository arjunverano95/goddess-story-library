import {createTheme, ThemeProvider, Header, Icon} from '@rneui/themed';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {LogBox, Image, View, ImageBackground} from 'react-native';

import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import Search from './src/views/Search';
import DrawerContent from './node_modules/@react-navigation/drawer/lib/module/views/DrawerContent';

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
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#e85d64',
    secondary: '#f2a4a8',
  },
};
const Drawer = createDrawerNavigator();
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar translucent={true}></StatusBar>
      {/* <SafeAreaProvider> */}
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Search"
            screenOptions={{
              headerShown: false,
            }}
            drawerContent={({navigation}) => (
              <>
                <View
                  style={{
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Image
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      height: 250,
                      width: '100%',
                    }}
                    source={require('./assets/cover.png')}
                  />
                </View>

                <DrawerItem
                  icon={() => <Icon name="search" />}
                  label="Search"
                  onPress={() => {
                    navigation.navigate('search');
                  }}
                />
                <DrawerItem
                  icon={() => <Icon name="list" />}
                  label="Set list"
                  onPress={() => {
                    navigation.navigate('setlist');
                  }}
                />
              </>
            )}
          >
            <Drawer.Screen name="search" component={Search} />
            <Drawer.Screen name="setlist" component={() => <></>} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      {/* </SafeAreaProvider> */}
    </>
  );
}
