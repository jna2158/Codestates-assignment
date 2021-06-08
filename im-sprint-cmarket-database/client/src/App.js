import React from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import NotificationCenter from './components/NotificationCenter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import OrderList from './pages/OrderList';

function App () {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <ItemListContainer />
        </Route>
        <Route path='/shoppingcart'>
          <ShoppingCart />
        </Route>
        <Route path='/orderlist'>
          <OrderList />
        </Route>
      </Switch>
      <NotificationCenter />
    </Router>
  );
}

export default App;
