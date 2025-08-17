import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {Button, Icon} from '@rneui/themed';

import {Colors, Icons} from '../constants';

type DrawerParamList = {
  index: undefined;
  'goddess-story': undefined;
  'senpai-goddess-haven': undefined;
};

type DrawerNavigation = DrawerNavigationProp<DrawerParamList>;

interface HeaderProps {
  children?: React.ReactNode;
  showBackButton?: boolean;
}

const Header = (props: HeaderProps) => {
  const {children, showBackButton} = props;
  const navigation = useNavigation<DrawerNavigation>();

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
          onPress={() => {
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
