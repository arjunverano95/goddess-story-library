import SetList from '../views/SetList';
import VoiceSearch from '../views/VoiceSearch';
import {Icons} from './icons';
import {NavigationParamList, ScreenProps} from './navigation';

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
    icon: Icons.list,
    component: SetList,
  },
  {
    name: 'VoiceSearch',
    label: 'Search',
    icon: Icons.search,
    component: VoiceSearch,
  },
];
export const initialRoute: keyof NavigationParamList = 'SetList';
