import styled from 'styled-components';

export const AuthUserFeedback = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

  .register__circle-check {
    width: 12rem;
    height: 12rem;
  }

  .register__success-message {
    font-size: var(--mobile-text-size-l);
    letter-spacing: 0.1rem;
  }

  .register__redirect-login-button {
    text-align: center;
    background-color: var(--background-color-electric-blue);
    color: var(--text-color-white);
    font-size: var(--mobile-text-size-m);
    font-weight: var(--text-semi-bold);
    font-family: inherit;
    border: 0;
    border-radius: var(--mobile-button-border-radius);
    height: 3.5rem;
    width: 15rem;
    letter-spacing: 0.1rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 1440px) {
    padding: 4.5rem 0;
    gap: 3rem;

    .register__circle-check {
      width: 20rem;
      height: 20rem;
    }

    .register__success-message {
      font-size: var(--desktop-text-size-m);
      width: 30%;
    }

    .register__redirect-login-button {
      font-size: var(--desktop-text-size-m);
      width: 18rem;
      height: 5rem;
      /* margin-top: 7rem; */
    }
  }
`;
