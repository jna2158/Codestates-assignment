import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setOrders } from '../actions';
import OrderEntry from '../components/OrderEntry';

export default function OrderList () {
  const userId = 1;
  const state = useSelector((state) => state.itemReducer);
  const dispatch = useDispatch();
  const { orders } = state;

  useEffect(() => {
    dispatch(
      fetchData(`http://localhost:4000/users/${userId}/orders`, setOrders)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='item-list-body'>
      <div id='item-list-title'>주문내역</div>
      <div id='order-list-container'>
        {Object.keys(orders).length ? (
          Object.keys(orders).map((order) => (
            <OrderEntry
              id={order}
              order={orders[order]}
              orderDate={orders[order][0].created_at}
              totalPrice={orders[order][0].total_price}
            />
          ))
        ) : (
          <div id='item-list-text'>주문내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
