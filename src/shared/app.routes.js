import categoryContainer from '../containers/Category/Category';
import locationContainer from '../containers/Location/Location';
import categoryForm from '../containers/Category/CategoryForm/CategoryForm';
export const appRoutes = [
  {
    label: 'Category',
    path: '/category',
    icon: 'folder',
    component: categoryContainer
  },
  {
    label: 'Category',
    path: '/category/:id',
    component: categoryForm
  },
  {
    label: 'Category',
    path: '/category/new',
    component: categoryForm
  },
  {
    label: 'Location',
    path: '/location',
    icon: 'map',
    component: locationContainer
  }
];
