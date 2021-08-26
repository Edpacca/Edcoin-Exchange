import React from 'react';
import './App.css';
import { OrderUI } from './features/orderer/Orderer';
import { UserOrders } from './features/userAccount/UserOrders';

function App() {
  return (
    <div className="split-sections">
      <div className="App">
          <OrderUI />
      </div>
      <div>
        <UserOrders />
      </div>
    </div>
  );
}

export default App;
