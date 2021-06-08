import { ADD_TO_CART, REMOVE_FROM_CART, SET_QUANTITY } from '../../actions/index';
import { initialState } from '../initialState';
import cartReducer from '../cartReducer';

describe('Item Reducer', () => {
  it('ADD_TO_CART 액션에 따라 cartItems 상태가 변해야 합니다', () => {
    expect(
      cartReducer(
        initialState,
        {
          type: ADD_TO_CART,
          payload: {
            itemId: 4,
            quantity: 1
          }
        }
      )
    ).toEqual({
      items: initialState.items,
      cartItems: [...initialState.cartItems, { itemId: 4, quantity: 1 }],
      notifications: [],
      orders: {}
    });
  });
  it('REMOVE_FROM_CART 액션에 따라 cartItems 상태가 변해야 합니다', () => {
    expect(
      cartReducer(
        Object.assign({}, initialState, {
          cartItems: [
            {
              itemId: 4,
              quantity: 1
            }
          ]
        }),
        {
          type: REMOVE_FROM_CART,
          payload: {
            itemId: 4
          }
        }
      )
    ).toEqual({
      items: initialState.items,
      cartItems: [],
      notifications: [],
      orders: {}
    });
  });
  it('SET_QUANTITY 액션에 따라 cartItems 상태가 변해야 합니다', () => {
    expect(
      cartReducer(
        Object.assign({}, initialState, {
          cartItems: [
            {
              itemId: 4,
              quantity: 1
            }
          ]
        }),
        {
          type: SET_QUANTITY,
          payload: {
            itemId: 4,
            quantity: 8
          }
        }
      )
    ).toEqual({
      items: initialState.items,
      cartItems: [{
        itemId: 4,
        quantity: 8
      }],
      notifications: [],
      orders: {}
    });
  });
  it('리듀서는 다른 상태의 값을 보존해야 합니다', () => {
    expect(
      cartReducer(
        {
          mustkeep: 'other states', cartItems: []
        },
        {
          type: ADD_TO_CART,
          payload: {
            itemId: 6,
            quantity: 1
          }
        }
      )
    ).toEqual({
      mustkeep: 'other states',
      cartItems: [{ itemId: 6, quantity: 1 }]
    });
    expect(
      cartReducer(
        {
          mustkeep: 'other states',
          cartItems: [
            {
              itemId: 6,
              quantity: 1
            },
            {
              itemId: 1,
              quantity: 1
            }
          ]
        },
        {
          type: REMOVE_FROM_CART,
          payload: {
            itemId: 1
          }
        }
      )
    ).toEqual({
      mustkeep: 'other states',
      cartItems: [
        {
          itemId: 6,
          quantity: 1
        }
      ]
    });
  });
});
