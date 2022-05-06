import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import './App.css';
import { Authen } from './pages/Authentication/Authen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './common/Header/Header';
import { MainLayout } from './common/Layout/MainLayout';
import { Home } from './pages/Home/Home';
import PrivateRoute from './routes/PrivateRoute';
import { User } from './pages/User/User';
import { Error } from './pages/Error/Error';

function App() {
  const dark = {
    theme: {
      primaryColor: '#e30000',
    }
  }

  ConfigProvider.config(dark)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route element={<MainLayout/>}>
              <Route path='/' element={<Home/>} />
              <Route path='/user' element={<User/>} />
            </Route>
          </Route>
          <Route path='/login' element={<Authen/>} />
          <Route path='/err' element={<Error/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
