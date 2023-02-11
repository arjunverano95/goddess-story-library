import SetList from '../../views/SetList';
import {Icons} from '../constants';
import {NavigationParamList, ScreenProps} from './props';

interface Routes {
  name: keyof NavigationParamList;
  label: string;
  icon: string;
  component: (props: ScreenProps<keyof NavigationParamList>) => JSX.Element;
}

export const Routes: Routes[] = [
  {
    name: 'SetList',
    label: 'Goddess Story',
    icon: Icons.home,
    component: SetList,
  },
];
export const initialRoute: keyof NavigationParamList = 'SetList';
