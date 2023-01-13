import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from '@rneui/base';

import {NavigationParamList} from '../../app/navigation';
import {initialRoute, Routes} from '../../app/routes';

const Drawer = createDrawerNavigator<NavigationParamList>();

const DrawerNavigation = () => {
  const DrawerContent = (props: DrawerContentComponentProps) => {
    const {navigation} = props;
    return (
      <>
        <View style={styles.drawerContentContainer}>
          <Image
            style={styles.drawerContentCoverImage}
            source={require('../../../assets/cover.png')}
          />
        </View>
        {Routes.map((item) => (
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
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        {Routes.map((item) => (
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
