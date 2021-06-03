import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, setQuantity } from '../actions';
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'

export default function ShoppingCart() {

  const state = useSelector(state => state.itemReducer);
  const { cartItems, items } = state
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState(cartItems.map((el) => el.itemId))

  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    }
    else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(cartItems.map((el) => el.itemId))
    }
    else {
      setCheckedItems([]);
    }
  };

  const handleQuantityChange = (quantity, itemId) => {
    //TODO: dispatch 함수를 호출하여 액션을 전달하세요.
    dispatch(setQuantity(itemId, quantity))
  }

  const handleDelete = (itemId) => {
    setCheckedItems(checkedItems.filter((el) => el !== itemId))
    //TODO: dispatch 함수를 호출하여 액션을 전달하세요.
    dispatch(removeFromCart(itemId))
  }

  const getTotal = () => {
    let cartIdArr = cartItems.map((el) => el.itemId)
    let total = {
      price: 0,
      quantity: 0,
    }
    for (let i = 0; i < cartIdArr.length; i++) {
      if (checkedItems.indexOf(cartIdArr[i]) > -1) {
        let quantity = cartItems[i].quantity
        let price = items.filter((el) => el.id === cartItems[i].itemId)[0].price

        total.price = total.price + quantity * price
        total.quantity = total.quantity + quantity
      }
    }
    return total
  }

  const renderItems = items.filter((el) => cartItems.map((el) => el.itemId).indexOf(el.id) > -1)
  const total = getTotal()

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">장바구니</div>
        <span id="shopping-cart-select-all">
          <input
            type="checkbox"
            checked={
              checkedItems.length === cartItems.length ? true : false
            }
            onChange={(e) => handleAllCheck(e.target.checked)} >
          </input>
          <label >전체선택</label>
        </span>
        <div id="shopping-cart-container">
          {!cartItems.length ? (
            <div id="item-list-text">
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
              <div id="cart-item-list">
                {renderItems.map((item, idx) => {
                  const quantity = cartItems.filter(el => el.itemId === item.id)[0].quantity
                  return <CartItem
                    key={idx}
                    handleCheckChange={handleCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    handleDelete={handleDelete}
                    item={item}
                    checkedItems={checkedItems}
                    quantity={quantity}
                  />
                })}
              </div>
            )}
          <OrderSummary total={total.price} totalQty={total.quantity} />
        </div>
      </div >
    </div>
  )
}
