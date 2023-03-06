import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';

import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon, Text} from '@rneui/themed';

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
      <View style={styles.footer}>
        <Pressable
          style={styles.footerButton}
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
          style={styles.footerButton}
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
          style={styles.footerButton}
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
  buttonIcon: {
    marginRight: 10,
  },
  footer: {flex: 1, padding: 15, justifyContent: 'flex-end'},
  footerButton: {
    marginTop: 5,
  },
  footerButtonImg: {
    height: 50,
    width: 'auto',
  },
  footerSubtitle: {
    marginTop: 10,
    textAlign: 'center',
  },
});
export default DrawerContent;
