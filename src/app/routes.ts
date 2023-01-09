import Search from '../views/Search';
import SetList from '../views/SetList';

interface Routes {
  name: string;
  label: string;
  icon: string;
  component: () => JSX.Element;
}
const routes: Routes[] = [
  {
    name: 'search',
    label: 'Search',
    icon: 'search',
    component: Search,
  },
  {
    name: 'setlist',
    label: 'Set List',
    icon: 'list',
    component: SetList,
  },
];
export default routes;
