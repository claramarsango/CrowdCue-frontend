import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface CheckAuthProps {
  children: JSX.Element;
}

const CheckAuth: FC<CheckAuthProps> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('Access Token') !== null;

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={`/auth/login`} replace={true} state={{ from: location }} />
    );
  }

  return children;
};

export default CheckAuth;
