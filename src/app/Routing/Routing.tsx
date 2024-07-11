import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Loader from '../../widgets/loader/Loader';
import News from '../../pages/news/News';
import Info from '../../pages/Info/Info';
import Comments from '../../pages/comments/Comments';
import Users from '../../pages/users/Users';
const Post = lazy(() => import('../../pages/post/Post'));
const CreatePost = lazy(() => import('../../pages/create-post/CreatePost'));
const Chats = lazy(() => import('../../pages/chats/Chats'));
const Chat = lazy(() => import('../../widgets/chats/chat/Chat'));
const MainLayout = lazy(() => import('../../pages/main-layout/MainLayout'));
const Posts = lazy(() => import('../../pages/posts/Posts'));
const Auth = lazy(() => import('../../pages/auth/Auth'));
const Profile = lazy(() => import('../../entities/profile/Profile'));

export const socket = io('http://localhost:4000');

export enum RoutesName {
  HomePage = '/',
  NewPost = '/new',
  Chats = '/chats',
  Auth = '/auth',
  UsersList = '/users',
  News = '/news',
  Notifications = '/notifications',
  I = '/i',
  Comments = ':user/:id/comments'
}

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RoutesName.HomePage}
          element={
            <Suspense fallback={<Loader />}>
              <MainLayout />
            </Suspense>
          }>
          <Route path={RoutesName.UsersList+'/:id'} element={<Profile />} />
          <Route path={RoutesName.UsersList} element={<Users />}/>
          <Route index element={<Posts />} />
          <Route path=':user/:id' element={<Post />} />
          <Route path={RoutesName.NewPost} element={<CreatePost />} />
          <Route path={RoutesName.News} element={<News />}/>
          <Route path={RoutesName.I} element={<Info />}/>
          <Route path={RoutesName.Comments} element={<Comments />}/>
          <Route path='*' element={<p>Not found page</p>}/>
        </Route>
        <Route
          path={RoutesName.Auth}
          element={
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          }
        />
        <Route path={RoutesName.Chats} element={<Chats />}>
          <Route path=':id' element={<Chat />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
