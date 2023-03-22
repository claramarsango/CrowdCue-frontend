import styled from 'styled-components';

export const SessionsListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  gap: 2rem 1.5rem;
  padding: 1.75rem;

  @media (min-width: 1440px) {
    padding: 3rem 8rem;
    gap: 4rem 7rem;
    justify-content: center;
  }
`;

export const ListFeedback = styled.div`
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
