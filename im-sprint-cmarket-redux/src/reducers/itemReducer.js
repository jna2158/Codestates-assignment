import { REMOVE_FROM_CART, ADD_TO_CART, SET_QUANTITY } from "../actions/index";
import { initialState } from "./initialState";

const itemReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
      break;
    case REMOVE_FROM_CART:
      let filtered = state.cartItems.filter(el => el.itemId !== action.payload.itemId)
      return {
        ...state,
        cartItems: [...filtered]
      }      
      break;
    case SET_QUANTITY:
      const copied = {...state};
      let idx = state.cartItems.findIndex(el => el.itemId === action.payload.itemId)
      copied.cartItems[idx].quantity = action.payload.quantity;
      return copied
      break;
      
    default:
      return state;
  }
}

export default itemReducer;