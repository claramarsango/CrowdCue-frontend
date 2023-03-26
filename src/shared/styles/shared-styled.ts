import styled from 'styled-components';

export const PageTitle = styled.h2`
  display: none;

  @media (min-width: 1440px) {
    display: block;
    font-size: var(--desktop-text-size-xl);
  }
`;

export const SectionTitle = styled.h2`
  padding: 1.5rem;

  @media (min-width: 1440px) {
    padding: 3rem;
    font-size: var(--desktop-text-size-xl);
  }
`;
