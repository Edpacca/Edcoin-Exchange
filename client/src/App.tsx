import './App.css';
import React from 'react';
import logo from './logo.svg';
import { store } from './app/store';
import { UserNavbar } from './features/navigation/UserNavbar';
import { PublicNavbar } from './features/navigation/PublicNavbar';
import { fetchOrders } from './features/orders/orderSlice';
import { fetchTrades } from './features/trades/tradeSlice';

store.dispatch(fetchOrders());
store.dispatch(fetchTrades());

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="split-sections">
          <div className="private-area" >
            <UserNavbar />
          </div>
          <div className="public-area">
            <PublicNavbar />
          </div>
        </div>
    </div>
  );
}

export default App;
