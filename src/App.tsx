import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import './App.css';
import { Authen } from './pages/Authentication/Authen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import PrivateRoute from './routes/PrivateRoute';
import { User } from './pages/User/User';
import { Error } from './pages/Error/Error';
import { CreatePost } from './pages/CreatePost/CreatePost';

const MainLayout = React.lazy(() => import('./common/Layout/MainLayout').then((module) => ({
  default: module.MainLayout,
})));

function App() {
  // useEffect(() => {

  // }, [])

  const dark = {
    theme: {
      primaryColor: '#fc2626',
    }
  }

  ConfigProvider.config(dark)
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<span>Loading...</span>} >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/user' element={<User />} />
              <Route path='/create' element={<CreatePost />} />
              <Route element={<PrivateRoute />}>
                
              </Route>
            </Route>
            <Route path='/login' element={<Authen />} />
            <Route path='/err' element={<Error />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
