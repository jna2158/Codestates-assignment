import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  itemReducer,
  cartReducer,
  notificationReducer
});

export default rootReducer;
