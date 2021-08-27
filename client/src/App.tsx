import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Navbar } from './features/navigation/Navbar';

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-function">
          <Navbar />
        </div>
    </div>
  );
}

export default App;
