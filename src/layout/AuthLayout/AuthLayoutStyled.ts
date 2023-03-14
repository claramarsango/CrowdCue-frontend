import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  padding: 1.5rem;

  .header__logo {
    width: 2.5rem;
    height: 2.2rem;
    margin: auto 0;
  }

  .header__title {
    font-size: var(--mobile-text-size-xxl);
    color: var(--text-color-white);
  }
`;
