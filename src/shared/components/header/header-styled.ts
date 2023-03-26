import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-evenly;
  position: sticky;
  top: 0;
  padding: 0.25rem 0;
  box-shadow: 0 4px 5px var(--background-color-faded-grey);
  background-color: var(--background-color-faded-grey);
  width: 100%;

  .header__logo-container {
    display: none;
  }

  .header__menu {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .menu__home-container,
  .menu__session-container {
    text-decoration: none;
    color: inherit;
  }

  .home__icon,
  .session__icon {
    font-size: 1.5rem;
    padding: 0.5rem 0 0.25rem;
  }

  @media (min-width: 1440px) {
    justify-content: flex-start;
    gap: 20rem;
    padding: 2rem 4rem;

    .header__logo-container {
      display: flex;
      gap: 0.5rem;
    }

    .logo__img {
      height: 4rem;
      width: 5rem;
      align-self: center;
    }

    .logo__title {
      font-size: var(--desktop-text-size-xxl);
    }

    .header__menu {
      width: auto;
      gap: 15rem;
      font-size: var(--desktop-text-size-s);
    }

    .menu__home-container,
    .menu__session-container {
      display: flex;
      align-items: center;
    }

    .home__icon,
    .session__icon {
      display: none;
    }
  }
`;
