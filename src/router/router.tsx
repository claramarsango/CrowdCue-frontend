import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout/AuthLayout';

export const router = createBrowserRouter([
  { path: '/auth', element: <AuthLayout />, children: [] },
  {
    /* path: '/',
    element: <MainLayout />,
    //errorElement: <NotFound />,
    children: [], */
  },
]);
