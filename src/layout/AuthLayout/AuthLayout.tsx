import { Outlet } from 'react-router-dom';
import { Header } from './AuthLayoutStyled';

const AuthLayout = () => {
  return (
    <>
      <Header>
        <img
          src="crowdcue-logo.png"
          alt="CrowdCue logo"
          className="header__logo"
        />
        <h1 className="header__title">CrowdCue</h1>
      </Header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
