import React from 'react';
import {StyleSheet, View} from 'react-native';

import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';

import {Colors} from '../app/colors';
import {Icons} from '../app/icons';

interface HeaderProps {
  children?: JSX.Element | JSX.Element[];
  showBackButton?: boolean;
}
const Header = (props: HeaderProps) => {
  const {children, showBackButton} = props;
  const navigation = useNavigation<DrawerNavigationHelpers>();
  return (
    <View
      style={[
        styles.headerContainer,
        showBackButton ? {backgroundColor: Colors.transparent} : {},
      ]}
    >
      {showBackButton ? (
        <Button
          containerStyle={styles.toggleDrawerContainer}
          buttonStyle={styles.toggleDrawerButton}
          type="clear"
          onPress={async () => {
            navigation.goBack();
          }}
        >
          <Icon name={Icons.arrow_left} color={Colors.black} />
        </Button>
      ) : (
        <Button
          containerStyle={styles.toggleDrawerContainer}
          buttonStyle={styles.toggleDrawerButton}
          type="clear"
          onPress={async () => {
            navigation.openDrawer();
          }}
        >
          <Icon name={Icons.menu} color="white" />
        </Button>
      )}

      {children && (
        <View style={styles.headerContentContainer}>{props.children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // paddingTop: 50,
    backgroundColor: Colors.headerBg,
    flexDirection: 'row',
  },
  toggleDrawerContainer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  toggleDrawerButton: {
    height: 46,
  },
  headerContentContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
  },
});
export default Header;
