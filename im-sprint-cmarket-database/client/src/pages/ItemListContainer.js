import React, { useEffect } from 'react';
import { addToCart, fetchData, notify, setProducts } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import Item from '../components/Item';

function ItemListContainer () {
  const itemState = useSelector((state) => state.itemReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const { items } = itemState;
  const { cartItems } = cartState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData('http://localhost:4000/items', setProducts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (item) => {
    if (!cartItems.map((el) => el.itemId).includes(item.id)) {
      dispatch(addToCart(item.id));
      dispatch(notify(`장바구니에 ${item.name}이(가) 추가되었습니다.`));
    } else {
      dispatch(notify('이미 추가된 상품입니다.'));
    }
  };

  return (
    <div id='item-list-container'>
      <div id='item-list-body'>
        <div id='item-list-title'>쓸모없는 선물 모음</div>
        {items.map((item, idx) => (
          <Item
            item={item}
            key={idx}
            handleClick={() => {
              handleClick(item);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
