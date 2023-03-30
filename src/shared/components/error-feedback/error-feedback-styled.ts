import styled from 'styled-components';

export const ErrorFeedbackStyled = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .error-icon {
    width: 10rem;
    height: 10rem;
    margin: auto;
  }

  .error-message {
    font-size: var(--mobile-text-size-l);
    font-weight: var(--text-regular);
  }

  .error-redirect-button {
    margin-top: 1rem;
    width: 60%;
    color: inherit;
    font-family: inherit;
    font-size: 1rem;
    font-weight: var(--text-semi-bold);
    border: 0;
    border-radius: var(--mobile-button-border-radius);
    padding: 1rem;
    background-color: var(--background-color-electric-blue);
  }

  @media (min-width: 1440px) {
    padding: 3rem;
    gap: 5rem;

    .error-icon {
      width: 17rem;
      height: 17rem;
    }

    .error-message {
      font-size: var(--desktop-text-size-l);
    }

    .error-redirect-button {
      width: 30%;
      padding: 1.5rem;
      font-size: var(--desktop-text-size-m);
      border-radius: var(--desktop-button-border-radius);
    }
  }
`;
