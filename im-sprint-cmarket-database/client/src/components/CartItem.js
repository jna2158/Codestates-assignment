import React from 'react';

export default function CartItem ({
  item,
  cartItems,
  checkedItems,
  handleCheckChange,
  handleQuantityChange,
  handleDelete,
  quantity
}) {
  return (
    <li className='cart-item-body'>
      <input
        type='checkbox'
        className='cart-item-checkbox'
        onChange={(e) => {
          const targetItem = cartItems.filter((el) => el.itemId === item.id)[0];
          handleCheckChange(e.target.checked, targetItem);
        }}
        checked={checkedItems.findIndex(el => el.itemId === item.id) > -1}
      />
      <div className='cart-item-thumbnail'>
        <img src={item.image} alt={item.name} />
      </div>
      <div className='cart-item-info'>
        <div className='cart-item-title' data-testid={`cart-${item.name}`}>{item.name}</div>
        <div className='cart-item-price'>{item.price} 원</div>
      </div>
      <input
        type='number'
        min={1}
        className='cart-item-quantity'
        value={quantity}
        onChange={(e) => {
          handleQuantityChange(Number(e.target.value), item.id);
        }}
      />
      <button className='cart-item-delete' onClick={() => { handleDelete(item.id); }}>삭제</button>
    </li>
  );
}
