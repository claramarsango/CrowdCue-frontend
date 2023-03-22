import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout/AuthLayout';
import MainLayout from '../layout/MainLayout/MainLayout';
import CreateSession from '../pages/CreateSession/CreateSession';
import ExploreSessions from '../pages/ExploreSessions/ExploreSessions';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SessionDetail from '../pages/SessionDetail/SessionDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <ExploreSessions /> },
      { path: 'sessions', element: <CreateSession /> },
      { path: 'sessions/:_id', element: <SessionDetail /> },
    ],
  },
  {
    path: 'auth/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
