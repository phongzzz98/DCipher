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
import { Loading } from './pages/LoadingPage/LoadingPage';
import { Search } from './pages/Search/Search';
import { TagPage } from './pages/TagPage/TagPage';
import { MyPage } from './pages/MyPage/MyPage';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { Users } from './pages/Users/Users';
import { UserPage } from './pages/UserPage/UserPage';

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
        <Suspense fallback={<Loading/>} >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/user/:id' element={<UserPage />} />
              <Route path='/tags' element={<TagPage />}/>
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/playground' element={<Playground />} />
              <Route path='/post/:id' element={<Post />} />
              <Route path='/search' element={<Search />} />
              <Route element={<PrivateRoute />}>
                <Route path='/create' element={<CreatePost />} />
                <Route path='/editProfile' element={<EditProfile />} />
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
