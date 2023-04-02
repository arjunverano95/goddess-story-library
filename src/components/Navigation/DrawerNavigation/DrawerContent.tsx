import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';

import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text} from '@rneui/themed';

import Routes from '../../../app/navigation/routes';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {navigation} = props;
  return (
    <View style={{flex: 1}}>
      <View style={styles.drawerContentContainer}>
        <Image
          style={styles.drawerContentCoverImage}
          source={require('../../../../assets/cover.png')}
        />
      </View>
      <View style={styles.routesContainer}>
        {Routes.map((item) => (
          <DrawerItem
            key={item.name}
            icon={() => (
              <Image
                resizeMode={'contain'}
                style={styles.iconImg}
                source={item.icon}
              />
            )}
            label={item.label}
            onPress={() => {
              navigation.navigate(item.name);
            }}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerButtonContainer}>
          <Pressable
            onPress={() => {
              Linking.openURL('https://www.reddit.com/r/GoddessStoryTCG');
            }}
          >
            <Image
              resizeMode={'contain'}
              style={styles.footerButtonImg}
              source={require('../../../../assets/reddit.png')}
            />
          </Pressable>
          <Pressable
            style={styles.footerButtonSpacer}
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/groups/goddessstoryandwaifucardnewsupdatesandcollections',
              );
            }}
          >
            <Image
              resizeMode={'contain'}
              style={styles.footerButtonImg}
              source={require('../../../../assets/facebook.png')}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL('https://discord.gg/waifucard');
            }}
          >
            <Image
              resizeMode={'contain'}
              style={styles.footerButtonImg}
              source={require('../../../../assets/discord.png')}
            />
          </Pressable>
        </View>
        <Text style={styles.footerSubtitle}>{'Waifu Card Community'}</Text>
      </View>
    </View>
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
  routesContainer: {flex: 1},
  footer: {padding: 15},
  footerButtonContainer: {
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  footerButtonSpacer: {marginHorizontal: 10},
  footerButtonImg: {
    height: 30,
    width: 30,
  },
  footerSubtitle: {
    marginTop: 5,
    textAlign: 'center',
  },
  iconImg: {
    height: 25,
    width: 25,
  },
});
export default DrawerContent;
