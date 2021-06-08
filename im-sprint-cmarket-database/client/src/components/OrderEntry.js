import React from 'react';

export default function Order ({ order, id, orderDate, totalPrice }) {
  const formatDate = (date) => {
    const day = date.slice(0, 10);
    const time = date.slice(11, 16);
    return [day, time].join(' ');
  };

  return (
    <div className='order-list-body'>
      <div className='order-list-info'>
        <h3>Order. {id}</h3>
        <div>{formatDate(orderDate)}</div>
      </div>
      <div className='order-item-container'>
        {order.map((item) => (
          <div className='order-item-body'>
            <div className='order-item-info'>{item.name}</div>
            <img src={item.image} className='item-img' alt={item.name} />
            <div className='order-item-info'>{item.price}원</div>
            <div className='order-item-info'>{item.order_quantity}개</div>
          </div>
        ))}
      </div>
      <div className='order-list-info'>
        <h3>Total</h3>
        <div>{totalPrice}원</div>
      </div>
    </div>
  );
}
