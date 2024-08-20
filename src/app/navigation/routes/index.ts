import {NavigationParamList, ScreenProps} from '../types';
import BaseScreen from '../../../components/BaseScreen';

interface Routes {
  name: keyof NavigationParamList;
  label: string;
  icon: number;
  component: (props: ScreenProps<keyof NavigationParamList>) => JSX.Element; //(props: ScreenProps<keyof NavigationParamList>) => JSX.Element;
}

const Routes: Routes[] = [
  {
    name: 'GoddessStory',
    label: 'Goddess Story',
    icon: require('../../../../assets/little-frog.png'),
    component: (props: ScreenProps<'GoddessStory'>) => {
      return BaseScreen({
        navigation: props.navigation,
        dataUrl: '/data/goddess-story.json',
      });
    },
  },
  {
    name: 'SenpaiGoddessHaven',
    label: 'Senpai Goddess Haven',
    icon: require('../../../../assets/senpai-goddess-haven.png'),
    component: (props: ScreenProps<'GoddessStory'>) => {
      return BaseScreen({
        navigation: props.navigation,
        dataUrl: '/data/senpai-goddess-haven.json',
      });
    },
  },
];
export const initialRoute: keyof NavigationParamList = 'GoddessStory';
export default Routes;
