import styled from 'styled-components';

export const ModalStyled = styled.div`
  position: absolute;
  top: 4rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4rem;
  background-color: rgb(24, 24, 36);
  height: 75%;
  padding: 2rem 1rem;
  margin: 1.5rem;
  border-radius: var(--mobile-button-border-radius);

  .message-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .message__check {
    font-size: var(--mobile-text-size-l);
  }

  .message__participant-check {
    padding-bottom: 3rem;
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .buttons__end,
  .buttons__cancel {
    color: inherit;
    font-family: inherit;
    font-size: 1rem;
    border: 0;
  }

  .buttons__end {
    background-color: var(--background-color-red);
    font-weight: var(--text-semi-bold);
    border-radius: var(--mobile-button-border-radius);
    padding: 1rem;
  }

  .buttons__cancel {
    background-color: transparent;
  }

  @media (min-width: 1440px) {
    position: absolute;
    top: unset;
    bottom: 0;
    gap: 3rem;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 3rem;
    border-radius: var(--mobile-button-border-radius)
      var(--mobile-button-border-radius) 0 0;

    .message__check,
    .message__participant-check {
      font-size: var(--desktop-text-size-s);
    }

    .message__participant-check {
      padding: 0;
    }

    .message__warning {
      font-size: var(--desktop-text-size-xs);
    }

    .buttons-container {
      flex-direction: row;
      justify-content: center;
      gap: 15rem;
    }

    .buttons__end,
    .buttons__cancel {
      font-size: var(--desktop-text-size-xs);
    }

    .buttons__end {
      padding: 1rem 2.5rem;
    }
  }
`;
