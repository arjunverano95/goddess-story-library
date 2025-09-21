'use client';
import {useListings} from '@/src/hooks';
import {DrawerItem} from '@react-navigation/drawer';
import {useRouter} from 'expo-router';
import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Colors} from '../constants';

// const Routes: {
//   name: string;
//   label: string;
//   icon: any;
//   route: string;
// }[] = [
//   {
//     name: LISTING_DATA[CARD_LISTING.GSL].id,
//     label: LISTING_DATA[CARD_LISTING.GSL].name,
//     icon: LISTING_DATA[CARD_LISTING.GSL].image_url,
//     route: '/',
//   },
//   {
//     name: LISTING_DATA[CARD_LISTING.SGH].id,
//     label: LISTING_DATA[CARD_LISTING.SGH].name,
//     icon: LISTING_DATA[CARD_LISTING.SGH].image_url,
//     route: '/senpai-goddess-haven',
//   },
//   {
//     name: LISTING_DATA[CARD_LISTING.FG].id,
//     label: LISTING_DATA[CARD_LISTING.FG].name,
//     icon: LISTING_DATA[CARD_LISTING.FG].image_url,
//     route: '/flower-girl',
//   },
//   {
//     name: LISTING_DATA[CARD_LISTING.FL].id,
//     label: LISTING_DATA[CARD_LISTING.FL].name,
//     icon: LISTING_DATA[CARD_LISTING.FL].image_url,
//     route: '/fire-legend',
//   },
// ];

const CustomDrawerContent = (props: any) => {
  const router = useRouter();
  const {listings} = useListings();

  const handleNavigation = (route: any) => {
    router.push(route);
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
        {listings.map((item, index) => (
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
                  source={{uri: item.image_url}}
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
            label={item.name}
            onPress={() => {
              handleNavigation(item.id);
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
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
  drawerItem: {
    borderRadius: 0,
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
