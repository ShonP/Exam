import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import locationReducer from './location/location.reducer';
import categoryReducer from './category/category.reducer';
export default combineReducers({
  form,
  locationReducer,
  categoryReducer
});
