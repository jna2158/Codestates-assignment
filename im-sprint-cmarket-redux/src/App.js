import React, { useState } from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import NotificationCenter from './components/NotificationCenter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ShoppingCart from './pages/ShoppingCart';

function App() {

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart />
        </Route>
      </Switch>
      <NotificationCenter />
    </Router>
  );
}

export default App;
