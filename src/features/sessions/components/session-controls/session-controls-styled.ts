import styled from 'styled-components';

export const SessionControlsStyled = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  .player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 8rem;
    background-color: var(--background-color-faded-grey);
    border-radius: var(--mobile-button-border-radius);
  }

  .player__message {
    width: 80%;
    font-size: var(--mobile-text-size-s);
  }

  .session-url {
    width: 100%;
    font-size: var(--mobile-text-size-xs);
    overflow: scroll;
    white-space: nowrap;
  }

  .url__title {
    font-weight: var(--text-semi-bold);
    font-size: var(--mobile-text-size-m);
  }

  .control-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .buttons__search,
  .buttons__queue,
  .buttons__quit {
    color: inherit;
    font-family: inherit;
    font-size: 1rem;
    font-weight: var(--text-semi-bold);
    border: 0;
    border-radius: var(--mobile-button-border-radius);
    padding: 1rem 2.75rem;
  }

  .buttons__search,
  .buttons__queue {
    background-color: var(--background-color-electric-blue);
  }

  .buttons__quit {
    background-color: var(--background-color-red);
    width: 100%;
  }

  @media (min-width: 1440px) {
    padding: 1rem 0;
    gap: 5rem;

    .participants,
    .session-url {
      font-size: var(--desktop-text-size-s);
    }

    .player {
      width: 70%;
      height: 12rem;
      background-color: var(--background-color-faded-grey);
      border-radius: var(--mobile-button-border-radius);
    }

    .player__message {
      font-size: var(--desktop-text-size-s);
    }

    .session-url {
      width: 80%;
    }

    .url__title {
      font-size: var(--desktop-text-size-m);
    }

    .control-buttons {
      flex-wrap: nowrap;
      gap: 5rem;
      margin-top: 2rem;
    }

    .buttons__search,
    .buttons__queue,
    .buttons__quit {
      width: 22rem;
      padding: 1.5rem 0;
      border-radius: var(--desktop-button-border-radius);
      font-size: var(--desktop-text-size-s);
    }

    .buttons__queue {
      order: 1;
    }
  }
`;
