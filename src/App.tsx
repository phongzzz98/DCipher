import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import './App.css';
import { Authen } from './pages/Authentication/Authen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import PrivateRoute from './routes/PrivateRoute';
import { Playground } from './pages/Playground/Playground';
import { Error } from './pages/Error/Error';
import { CreatePost } from './pages/CreatePost/CreatePost';
import { Post } from './pages/Post/Post';

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
              <Route path='/playground' element={<Playground />} />
              <Route path='/post/:id' element={<Post />} />
              <Route element={<PrivateRoute />}>
                <Route path='/create' element={<CreatePost />} />
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
