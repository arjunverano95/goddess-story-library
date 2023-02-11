import {DrawerNavigationProp} from '@react-navigation/drawer';

import {NavigationParamList} from './NavigationParamList';

export type NavigationProp<Screen extends keyof NavigationParamList> =
  DrawerNavigationProp<NavigationParamList, Screen>;
