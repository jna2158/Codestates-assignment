import * as reactRedux from 'react-redux';
import { fireEvent, render, } from "@testing-library/react";
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import ItemListContainer from "../ItemListContainer"
import ShoppingCart from "../ShoppingCart";
import store from "../../store/store"

describe("Shopping Pages", () => {
  let utils, itemList
  const spyDispatch = jest.spyOn(store, "dispatch")

  beforeEach(() => {
    utils = render(
      <reactRedux.Provider store={store}>
        <ShoppingCart />
      </reactRedux.Provider>)
  })

  test('ShoppingCart에 cartItems가 렌더되어야합니다.', () => {
    const cartItemElement1 = utils.queryByTestId("cart-노른자 분리기")
    const cartItemElement2 = utils.queryByTestId("cart-2020년 달력")
    const cartItemElement3 = utils.queryByTestId("cart-개구리 안대")
    expect(cartItemElement1).toBeInTheDocument()
    expect(cartItemElement2).toBeInTheDocument()
    expect(cartItemElement3).not.toBeInTheDocument()
  })

  test('ADD_TO_CART 액션에 따라 ShoppingCart가 렌더되어야 합니다.', () => {
    itemList = render(
      <reactRedux.Provider store={store}>
        <ItemListContainer handleToast={() => { }} />
      </reactRedux.Provider>)
    const frog = itemList.getAllByText("장바구니 담기")[2]

    fireEvent.click(frog)

    expect(utils.queryByTestId("cart-개구리 안대")).toBeInTheDocument()
    expect(spyDispatch).toHaveBeenCalled()
  })

  test('REMOVE_FROM_CART 액션에 따라 ShoppingCart가 렌더되어야 합니다.', () => {
    const target = utils.queryAllByText("삭제")[0]

    fireEvent.click(target)

    const cartItemElement1 = utils.queryByTestId("cart-노른자 분리기")
    const cartItemElement2 = utils.queryByTestId("cart-개구리 안대")

    expect(cartItemElement1).not.toBeInTheDocument()
    expect(cartItemElement2).toBeInTheDocument()
    expect(spyDispatch).toHaveBeenCalled()
  })

  test('SET_QUANTITY 액션에 따라 OrderSummary가 렌더되어야 합니다.', () => {
    const target = utils.queryByDisplayValue("7")
    const totalPrice = utils.queryByText("59200 원")
    const totalQtY = utils.queryByText("11 개")

    fireEvent.change(target, { target: { value: 23 } })

    expect(totalPrice.textContent).toBe("105600 원")
    expect(totalQtY.textContent).toBe("27 개")
    expect(spyDispatch).toHaveBeenCalled()
  })

  test('Checkbox의 상태에 따라 OrderSummary가 렌더되어야 합니다.', () => {
    const target = utils.queryAllByRole('checkbox')[1]
    const totalPrice = utils.queryByText("105600 원")
    const totalQtY = utils.queryByText("27 개")

    fireEvent.click(target)

    expect(totalPrice.textContent).toBe("69600 원")
    expect(totalQtY.textContent).toBe("24 개")
  })
});
