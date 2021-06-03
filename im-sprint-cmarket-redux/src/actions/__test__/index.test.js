import * as actions from "../index";

describe("Shopping Cart Actions", () => {
  it("addToCart는 ADD_TO_CART 액션을 생성해야 합니다", () => {
    expect(actions.addToCart(3)).toEqual({
      type: "ADD_TO_CART",
      payload: {
        quantity: 1,
        itemId: 3
      },
    });
  });
  it("removeFromCart는 REMOVE_FROM_CART 액션을 생성해야 합니다", () => {
    expect(actions.removeFromCart(1)).toEqual({
      type: "REMOVE_FROM_CART",
      payload: {
        itemId: 1
      },
    });
  });
  it("setQuantity는 SET_QUANTITY 액션을 생성해야 합니다", () => {
    expect(actions.setQuantity(3, 2)).toEqual({
      type: "SET_QUANTITY",
      payload: {
        itemId: 3,
        quantity: 2
      },
    });
  });
});
