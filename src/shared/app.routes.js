import categoryContainer from '../containers/Category/Category';
import locationContainer from '../containers/Location/Location';
export const appRoutes = [
  {
    label: 'Category',
    path: '/category',
    icon: 'folder',
    component: categoryContainer
  },
  {
    label: 'Location',
    path: '/location',
    icon: 'map',
    component: locationContainer
  }
];
