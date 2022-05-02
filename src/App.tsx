import React from 'react';
import { ConfigProvider } from 'antd';
import './App.css';
import { Login } from './pages/Authentication/Authen';

function App() {
  const dark = {
    theme: {
      primaryColor: '#21006e',
    }
  }
  
  ConfigProvider.config(dark)
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
