import {Drawer} from 'expo-router/drawer';
import React from 'react';

import CustomDrawerContent from '../../../src/components/CustomDrawerContent';

export default function HomeDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      initialRouteName="index"
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
        name="[slug]/index"
        options={{
          title: 'Dynamic Route',
          drawerLabel: 'Dynamic Route',
        }}
      />
      <Drawer.Screen name="+not-found" />
    </Drawer>
  );
}
