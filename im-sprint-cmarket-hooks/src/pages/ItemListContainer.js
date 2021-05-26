import React from 'react';
import Item from '../components/Item';

function ItemListContainer({ items, addItem }) {

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">쓸모없는 선물 모음</div>
        {items.map((item, idx) => <Item item={item} key={idx} handleClick={() => {addItem(item.id)}} />)}
      </div>
    </div>
  );
}

export default ItemListContainer;
