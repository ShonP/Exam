import { combineReducers } from 'redux';
import locationReducer from './location/location.reducer';
import categoryReducer from './category/category.reducer';
export default combineReducers({
  locationReducer,
  categoryReducer
});
