import Search from '../views/Search';
import SetList from '../views/SetList';
import {Icons} from './icons';

interface Routes {
  name: string;
  label: string;
  icon: string;
  component: () => JSX.Element;
}
const routes: Routes[] = [
  {
    name: 'setlist',
    label: 'Goddess Story',
    icon: Icons.list,
    component: SetList,
  },
  {
    name: 'search',
    label: 'Search',
    icon: Icons.search,
    component: Search,
  },
];
export default routes;
export const initialRoute = 'setlist';
