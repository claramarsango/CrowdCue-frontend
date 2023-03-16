import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout/AuthLayout';
import Login from '../pages/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <Login /> }],
  },
]);
