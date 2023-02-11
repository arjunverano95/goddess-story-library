import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Routes, {initialRoute} from '../../../app/navigation/routes';
import {NavigationParamList} from '../../../app/navigation/types';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator<NavigationParamList>();

export const DrawerNavigation = () => {
  return (
    <NavigationContainer
      documentTitle={{
        formatter: () => `Goddess Story Library`,
      }}
    >
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
