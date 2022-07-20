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
import { EditPost } from './pages/EditPost/EditPost';
import AdminRoute from './routes/AdminRoute';
import { TagManager } from './pages/TagManager/TagManager';
import { UserManager } from './pages/UserManager/UserManager';
import { PostManager } from './pages/PostManager/PostManager';
import { ScoreManager } from './pages/ScoreManager/ScoreManager';
import { Contest } from './pages/Contest/Contest';
import { Problem } from './pages/Problem/Problem';
import { ProblemDetail } from './pages/ProblemDetail/ProblemDetail';
import { ContestManager } from './pages/ContestManager/ContestManager';
import { CommentManager } from './pages/CommentManager/CommentManager';

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
        <Suspense fallback={<Loading />} >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/user/:id' element={<UserPage />} />
              <Route path='/tags' element={<TagPage />} />
              <Route path='/playground' element={<Playground />} />
              <Route path='/post/:id' element={<Post />} />
              <Route path='/search' element={<Search />} />
              <Route path='/contest' element={<Contest />} />
              <Route path='/problem/:id' element={<Problem />} />
              <Route element={<PrivateRoute />}>
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/create' element={<CreatePost />} />
                <Route path='/editProfile' element={<EditProfile />} />
                <Route path='/editPost/:id' element={<EditPost />} />
                <Route path='/statDetail/:uid/:cid' element={<ProblemDetail />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path='/tagMng' element={<TagManager />} />
                <Route path='/userMng' element={<UserManager />} />
                <Route path='/postMng' element={<PostManager />} />
                <Route path='/scoreMng' element={<ScoreManager />} />
                <Route path='/contestMng' element={<ContestManager />} />
                <Route path='/commentMng' element={<CommentManager />} />
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
