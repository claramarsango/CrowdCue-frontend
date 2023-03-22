import styled from 'styled-components';

export const ErrorFeedbackStyled = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
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
`;
