import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from '@rneui/base';

import routes, {initialRoute} from '../../app/routes';

interface DrawerContentProps {
  navigation: DrawerNavigationHelpers;
}

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const DrawerContent = (props: DrawerContentProps) => {
    const {navigation} = props;
    return (
      <>
        <View style={styles.drawerContentContainer}>
          <Image
            style={styles.drawerContentCoverImage}
            source={require('../../../assets/cover.png')}
          />
        </View>
        {routes.map((item) => (
          <DrawerItem
            key={item.name}
            icon={() => <Icon name={item.icon} />}
            label={item.label}
            onPress={() => {
              navigation.navigate(item.name);
            }}
          />
        ))}
      </>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={({navigation}) => (
          <DrawerContent navigation={navigation} />
        )}
      >
        {routes.map((item) => (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  drawerContentContainer: {
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  drawerContentCoverImage: {
    position: 'absolute',
    bottom: 0,
    height: 250,
    width: '100%',
  },
});
export default DrawerNavigation;
