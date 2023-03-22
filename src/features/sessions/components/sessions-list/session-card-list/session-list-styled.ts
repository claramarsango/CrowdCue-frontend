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
