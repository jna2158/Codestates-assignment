import { ADD_TO_CART, REMOVE_FROM_CART, SET_QUANTITY } from "../../actions/index";
import { initialState } from "../initialState";
import itemReducer from "../itemReducer";

describe("Item Reducer", () => {
  it("ADD_TO_CART 액션에 따라 cartItems 상태가 변해야 합니다", () => {
    expect(
      itemReducer(
        initialState,
        {
          type: ADD_TO_CART,
          payload: {
            itemId: 4,
            quantity: 1
          },
        }
      )
    ).toEqual({
      items: initialState.items,
      cartItems: [...initialState.cartItems, { itemId: 4, quantity: 1 }],
      notifications: []
    });
  });
  it("REMOVE_FROM_CART 액션에 따라 cartItems 상태가 변해야 합니다", () => {
    expect(
      itemReducer(
        initialState,
        {
          type: REMOVE_FROM_CART,
          payload: {
            itemId: 1
          },
        }
      )
    ).toEqual({
      items: initialState.items,
      cartItems: [
        {
          "itemId": 5,
          "quantity": 7
        },
        {
          "itemId": 2,
          "quantity": 3
        }],
      notifications: []
    });
  });
  it("SET_QUANTITY 액션에 따라 cartItems 상태가 변해야 합니다", () => {
    expect(
      itemReducer(
        initialState,
        {
          type: SET_QUANTITY,
          payload: {
            itemId: 1,
            quantity: 8
          },
        }
      )
    ).toEqual({
      items: initialState.items,
      cartItems: [{
        "itemId": 1,
        "quantity": 8
      },
      {
        "itemId": 5,
        "quantity": 7
      },
      {
        "itemId": 2,
        "quantity": 3
      }],
      notifications: []
    });
  });
  it("리듀서는 다른 상태의 값을 보존해야 합니다", () => {
    expect(
      itemReducer(
        {
          mustkeep: "other states", cartItems: [],
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
      mustkeep: "other states",
      cartItems: [{ itemId: 6, quantity: 1 }],
    });
    expect(
      itemReducer(
        {
          mustkeep: "other states", cartItems: [
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
            itemId: 1,
          }
        }
      )
    ).toEqual({
      mustkeep: "other states",
      cartItems: [
        {
          itemId: 6,
          quantity: 1
        }
      ],
    });
  });
});
