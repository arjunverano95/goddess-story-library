import {DrawerScreenProps} from '@react-navigation/drawer';

import {NavigationParamList} from './NavigationParamList';

export type ScreenProps<Screen extends keyof NavigationParamList> =
  DrawerScreenProps<NavigationParamList, Screen>;
