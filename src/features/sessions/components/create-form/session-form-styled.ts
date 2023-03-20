import styled from 'styled-components';

export const SectionTitle = styled.h2`
  padding: 2rem;

  @media (min-width: 1440px) {
    padding: 3rem;
    font-size: var(--desktop-text-size-xl);
  }
`;

export const CreateSessionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 0 2rem;
  position: relative;

  .form__input-fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
  }

  .image__label {
    line-height: 3rem;
  }

  .image__input-container {
    height: 15rem;
    width: 15rem;
  }

  .image__input {
    font-size: 0rem;
    position: absolute;
    left: 0;
  }

  .image__input::file-selector-button {
    height: 15rem;
    width: 15rem;
    font-size: 1rem;
    font-family: Poppins, sans-serif;
    color: rgba(124, 124, 124);
    border-radius: 1.25rem;
    border: 0;
    background-color: var(--background-color-smoke-white);
  }

  .input-fields__title {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }

  .title__label {
    font-size: var(--mobile-text-size-l);
  }

  .title__input {
    border: 0;
    border-bottom: 1px solid var(--text-color-white);
    color: var(--text-color-white);
    background-color: rgba(255, 255, 255, 0);
    font-size: var(--mobile-text-size-s);
    font-weight: var(--text-light);
    line-height: 2rem;
    font-family: inherit;
  }

  .form__error {
    position: absolute;
    top: 5rem;
    color: var(--text-color-red);
    font-size: var(--mobile-text-size-xs);
    text-align: left;
  }

  .form__error--hidden {
    visibility: hidden;
  }

  .form__submit-button {
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
  }

  @media (min-width: 1400px) {
    padding: 3rem;

    .form__input-fields {
      flex-direction: row;
      gap: 7rem;
    }

    .image__label {
      line-height: 5rem;
      font-size: var(--desktop-text-size-xs);
    }

    .image__input-container {
      height: 35rem;
      width: 35rem;
    }

    .image__input::file-selector-button {
      height: 35rem;
      width: 35rem;
      font-size: var(--desktop-text-size-xs);
    }

    .input-fields__title {
      width: 30rem;
      padding: 8rem 0;
      gap: 4rem;
    }

    .title__label {
      font-size: var(--desktop-text-size-l);
    }

    .title__input {
      font-size: var(--desktop-text-size-s);
      line-height: 4rem;
    }

    .form__error {
      font-size: var(--desktop-text-size-xs);
      top: 20rem;
    }

    .form__submit-button {
      width: 25rem;
      height: 6rem;
      border-radius: var(--desktop-button-border-radius);
      font-size: var(--desktop-text-size-s);
    }
  }
`;
