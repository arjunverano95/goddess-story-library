import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon} from '@rneui/themed';

import Routes from '../../../app/navigation/routes';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {navigation} = props;
  return (
    <>
      <View style={styles.drawerContentContainer}>
        <Image
          style={styles.drawerContentCoverImage}
          source={require('../../../../assets/cover.png')}
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
export default DrawerContent;
