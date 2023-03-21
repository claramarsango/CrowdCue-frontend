import styled from 'styled-components';

export const SessionsListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  row-gap: 2rem;
  padding: 1.75rem;

  @media (min-width: 1440px) {
    padding: 3rem 8rem;
    row-gap: 4rem;
    column-gap: 5rem;
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
