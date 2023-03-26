import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { HeaderStyled } from './header-styled';

const Header = () => {
  return (
    <>
      <HeaderStyled>
        <div className="header__logo-container">
          <img
            src="/crowdcue-logo.png"
            alt="CrowdCue logo"
            className="logo__img"
          />
          <h1 className="logo__title">CrowdCue</h1>
        </div>
        <div className="header__menu">
          <Link to={'/'} className="menu__home-container">
            <FontAwesomeIcon icon={solid('house')} className="home__icon" />
            <p className="home__text">Home</p>
          </Link>
          <Link to={'/sessions'} className="menu__session-container">
            <FontAwesomeIcon icon={solid('music')} className="session__icon" />
            <p className="session__text">Session</p>
          </Link>
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
