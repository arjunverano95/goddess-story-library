import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';
import {View, StyleSheet} from 'react-native';

interface HeaderProps {
  children?: JSX.Element | JSX.Element[];
}
const Header = (props: HeaderProps) => {
  const navigation = useNavigation<DrawerNavigationHelpers>();
  return (
    <View style={styles.headerContainer}>
      <Button
        containerStyle={styles.toggleDrawerContainer}
        buttonStyle={styles.toggleDrawerButton}
        type="clear"
        onPress={async () => {
          navigation.openDrawer();
        }}
      >
        <Icon name="menu" color="white" />
      </Button>
      {props.children && (
        <View style={styles.headerContentContainer}>{props.children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50,
    backgroundColor: '#393e42',
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
