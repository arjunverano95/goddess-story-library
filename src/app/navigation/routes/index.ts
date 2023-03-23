import GoddessStory from '../../../views/GoddessStory';
import SenpaiGoddessHaven from '../../../views/SenpaiGoddessHaven';
import {NavigationParamList, ScreenProps} from '../types';

interface Routes {
  name: keyof NavigationParamList;
  label: string;
  icon: string;
  component: (props: ScreenProps<keyof NavigationParamList>) => JSX.Element;
}

const Routes: Routes[] = [
  {
    name: 'GoddessStory',
    label: 'Goddess Story',
    icon: 'little-frog.png',
    component: GoddessStory,
  },
  {
    name: 'SenpaiGoddessHaven',
    label: 'Senpai Goddess Haven',
    icon: 'senpai-goddess-haven.png',
    component: SenpaiGoddessHaven,
  },
];
export const initialRoute: keyof NavigationParamList = 'GoddessStory';
export default Routes;
