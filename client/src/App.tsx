import React from 'react';
import './App.css';
import logo from './logo.svg';
import { UserNavbar } from './features/navigation/UserNavbar';

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="split-sections">
          <div className="private-area" >
            <UserNavbar />
          </div>
        </div>
    </div>
  );
}

export default App;
