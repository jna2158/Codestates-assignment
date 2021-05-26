import React, { useState } from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ShoppingCart from './pages/ShoppingCart';
import { initialState } from './assets/state';

function App() {

  const [items, setItems] = useState(initialState.items);
  const [cartItems, setCartItems] = useState(initialState.cartItems);

  const addItem = (id) => {
    let filtered = cartItems.filter((el) => el.itemId === id);
    if(filtered.length !== 0) {
      alert('이미 존재하는 상품입니다.')
    } else {
      setCartItems([
        ...cartItems,{
        itemId: id,
        quantity: 1
      }]
      )
    }
  }

  return (
    <Router>
      <Nav cartItems={cartItems}/>
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items} addItem={addItem}/>
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart cartItems={cartItems} items={items} setCartItems={setCartItems}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
