import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {Colors} from '../constants';

type RouteType = 'index' | 'senpai-goddess-haven';

const Routes: {
  name: string;
  label: string;
  icon: any;
  route: RouteType;
}[] = [
  {
    name: 'GoddessStory',
    label: 'Goddess Story',
    icon: require('../../assets/little-frog.png'),
    route: 'index',
  },
  {
    name: 'SenpaiGoddessHaven',
    label: 'Senpai Goddess Haven',
    icon: require('../../assets/senpai-goddess-haven.png'),
    route: 'senpai-goddess-haven',
  },
];

// Debug: Log the icon sources
console.log(
  'Icon sources:',
  Routes.map((r) => ({name: r.name, icon: r.icon})),
);

const CustomDrawerContent = (props: any) => {
  const handleNavigation = (route: RouteType) => {
    props.navigation.navigate(route);
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerContentContainer}>
        <Image
          style={styles.drawerContentCoverImage}
          source={require('../../assets/cover.png')}
        />
      </View>

      <View style={styles.routesContainer}>
        {Routes.map((item, index) => (
          <DrawerItem
            key={`${item.name}-${index}-${Date.now()}`}
            icon={({focused, color, size}) => {
              console.log(
                `Rendering icon for ${item.name}, focused: ${focused}, color: ${color}, size: ${size}`,
              );
              return (
                <Image
                  resizeMode={'contain'}
                  style={[
                    styles.iconImg,
                    {
                      opacity: 1,
                    },
                  ]}
                  source={item.icon}
                  onError={(error) => {
                    console.log(
                      'Icon load error for',
                      item.name,
                      ':',
                      error.nativeEvent.error,
                    );
                  }}
                  onLoad={() => {
                    console.log('Icon loaded successfully for', item.name);
                  }}
                />
              );
            }}
            label={item.label}
            onPress={() => {
              handleNavigation(item.route);
            }}
            labelStyle={styles.drawerLabel}
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
              source={require('../../assets/reddit.png')}
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
              source={require('../../assets/facebook.png')}
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
              source={require('../../assets/discord.png')}
            />
          </Pressable>
        </View>
        <Text style={styles.footerSubtitle}>{'Waifu Card Community'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
  routesContainer: {
    flex: 1,
  },
  footer: {
    padding: 15,
    paddingBottom: 25,
    // borderTopWidth: 1,
    // borderTopColor: Colors.greyOutline,
  },
  footerButtonContainer: {
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  footerButtonSpacer: {
    marginHorizontal: 10,
  },
  footerButtonImg: {
    height: 30,
    width: 30,
  },
  footerSubtitle: {
    marginTop: 5,
    textAlign: 'center',
    color: Colors.black,
    opacity: 0.8,
  },
  iconImg: {
    height: 25,
    width: 25,
    backgroundColor: 'transparent',
  },
  drawerLabel: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
  },
});

export default CustomDrawerContent;
