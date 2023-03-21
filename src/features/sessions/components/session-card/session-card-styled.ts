import styled from 'styled-components';

export const SessionCardContainer = styled.li`
  list-style: none;
  width: 9rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .session-card__cover {
    width: 9rem;
    height: 9rem;
    object-fit: cover;
    border-radius: 1.25rem;
  }

  .session-card__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media (min-width: 1440px) {
    width: 17rem;
    gap: 1rem;
    font-size: var(--desktop-text-size-xs);

    .session-card__cover {
      width: 17rem;
      height: 17rem;
    }
  }
`;
