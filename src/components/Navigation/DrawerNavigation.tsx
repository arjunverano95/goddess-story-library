import {Image, View} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import routes from './../../app/routes';

// const navigatorTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#e85d64',
//     secondary: '#f2a4a8',
//   },
// };
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Search"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={({navigation}) => (
          <>
            <View
              style={{
                height: 200,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: 250,
                  width: '100%',
                }}
                source={require('../../../assets/cover.png')}
              />
            </View>
            {routes.map((item) => (
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
        )}
      >
        {routes.map((item) => (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default DrawerNavigation;
