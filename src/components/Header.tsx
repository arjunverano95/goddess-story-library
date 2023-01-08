import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';
import {View} from 'react-native';

interface HeaderProps {
  children?: JSX.Element;
}
const Header = (props: HeaderProps) => {
  const navigation = useNavigation<DrawerNavigationHelpers>();
  return (
    <View
      style={{
        paddingTop: 50,
        backgroundColor: '#393e42',
        flexDirection: 'row',
      }}
    >
      <Button
        containerStyle={{
          marginTop: 10,
          marginHorizontal: 5,
        }}
        buttonStyle={{
          height: 46,
        }}
        type="clear"
        onPress={async () => {
          navigation.openDrawer();
        }}
      >
        <Icon name="menu" color="white" />
      </Button>
      {props.children && (
        <View
          style={{
            padding: 0,
            margin: 0,
            flex: 1,
            flexDirection: 'row',
          }}
        >
          {props.children}
        </View>
      )}
    </View>
  );
};
export default Header;

// export default (props) => {
//   return (
//     <RNEHeader
//       barStyle="default"
//       centerComponent={
//         props.children && (
//           <View
//             style={{
//               padding: 0,
//               margin: 0,
//               flex: 1,
//               flexDirection: 'row',
//             }}
//           >
//             {props.children}
//           </View>
//         )
//       }
//       leftComponent={{icon: 'menu', color: '#fff'}}
//       placement="L"
//       rightComponent={{icon: 'home', color: '#fff'}}
//       rightContainerStyle={{}}
//       statusBarProps={{}}
//     />
//   );
// };
