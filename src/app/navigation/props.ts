import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';

export type NavigationParamList = {
  SetList: undefined;
  VoiceSearch: undefined;
};

export type NavigationProp<Screen extends keyof NavigationParamList> =
  DrawerNavigationProp<NavigationParamList, Screen>;

export type ScreenProps<Screen extends keyof NavigationParamList> =
  DrawerScreenProps<NavigationParamList, Screen>;
