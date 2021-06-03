import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  itemReducer,
  notificationReducer
});

export default rootReducer;