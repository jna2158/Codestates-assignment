import { SET_PRODUCTS, SET_ORDERS } from '../actions/index';
import { initialState } from './initialState';

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return Object.assign({}, state, {
        items: action.payload.items
      });
    case SET_ORDERS:
      return Object.assign({}, state, {
        orders: action.payload.orders
      });
    default:
      return state;
  }
};

export default itemReducer;
