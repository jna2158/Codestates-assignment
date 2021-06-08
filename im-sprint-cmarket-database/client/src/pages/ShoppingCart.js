import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setQuantity } from '../actions';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

export default function ShoppingCart () {
  const itemState = useSelector(state => state.itemReducer);
  const cartState = useSelector(state => state.cartReducer);
  const { items } = itemState;
  const { cartItems } = cartState;
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState([...cartItems]);

  const handleCheckChange = (checked, item) => {
    if (checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el.itemId !== item.itemId));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems([...cartItems]);
    } else {
      setCheckedItems([]);
    }
  };

  const handleQuantityChange = (quantity, itemId) => {
    dispatch(setQuantity(itemId, quantity));
  };

  const handleDelete = (itemId) => {
    setCheckedItems(checkedItems.filter((el) => el.itemId !== itemId));
    dispatch(removeFromCart(itemId));
  };

  const getTotal = () => {
    const cartIdArr = cartItems.map((el) => el.itemId);
    const total = {
      price: 0,
      quantity: 0
    };
    for (let i = 0; i < cartIdArr.length; i++) {
      if (checkedItems.findIndex((el) => el.itemId === cartIdArr[i]) > -1) {
        const quantity = cartItems[i].quantity;
        const price = items.filter((el) => el.id === cartItems[i].itemId)[0].price;

        total.price = total.price + quantity * price;
        total.quantity = total.quantity + quantity;
      }
    }
    return total;
  };

  const renderItems = items.filter((el) => cartItems.map((el) => el.itemId).indexOf(el.id) > -1);
  const total = getTotal();

  return (
    <div id='item-list-container'>
      <div id='item-list-body'>
        <div id='item-list-title'>장바구니</div>
        <span id='shopping-cart-select-all'>
          <input
            type='checkbox'
            checked={
              checkedItems.length === cartItems.length
            }
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
          <label>전체선택</label>
        </span>
        <div id='shopping-cart-container'>
          {!cartItems.length ? (
            <div id='item-list-text'>
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
            <div id='cart-item-list'>
              {renderItems.map((item, idx) => {
                const quantity = cartItems.filter(el => el.itemId === item.id)[0].quantity;
                return (
                  <CartItem
                    key={idx}
                    handleCheckChange={handleCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    handleDelete={handleDelete}
                    item={item}
                    checkedItems={checkedItems}
                    quantity={quantity}
                    cartItems={cartItems}
                  />
                );
              })}
            </div>
          )}
          <OrderSummary total={total.price} totalQty={total.quantity} cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}
