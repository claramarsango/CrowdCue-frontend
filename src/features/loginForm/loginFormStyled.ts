import styled from 'styled-components';

export const Form = styled.form`
  margin: 2rem 3rem 1rem;

  .form__inputs {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .form__email-field,
  .form__password-field {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .email__title,
  .password__title {
    text-align: left;
    font-size: var(--mobile-text-size-l);
  }

  .email__input,
  .password__input {
    border: 0;
    border-bottom: 1px solid var(--text-color-white);
    color: var(--text-color-white);
    background-color: rgba(255, 255, 255, 0);
    font-size: var(--mobile-text-size-s);
    font-weight: var(--text-light);
    line-height: 2rem;
    font-family: inherit;
  }

  .email__input:focus,
  .password__input:focus {
    outline: none;
  }

  .input:-internal-autofill-selected {
    background-color: inherit;
  }

  .form__error {
    color: var(--text-color-red);
    font-size: var(--mobile-text-size-xs);
    text-align: left;
    margin-top: 0.5rem;
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
    width: 90%;
    letter-spacing: 0.1rem;
    margin-top: 2.5rem;
  }

  @media (min-width: 1440px) {
    width: 40%;
    margin: 4rem auto 2rem;

    .form__inputs {
      gap: 5rem;
    }

    .form__email-field,
    .form__password-field {
      gap: 2rem;
    }

    .email__title,
    .password__title {
      font-size: var(--desktop-text-size-m);
    }

    .email__input,
    .password__input {
      border-bottom-width: 2px;
      font-size: var(--desktop-text-size-s);
    }

    .form__error {
      font-size: var(--desktop-text-size-xs);
    }

    .form__submit-button {
      width: 40%;
      height: 5rem;
      font-size: var(--desktop-text-size-s);
      margin-top: 4rem;
    }
  }
`;

export const RegisterLink = styled.p`
  .register-account__link {
    font-weight: var(--text-semi-bold);
  }

  @media (min-width: 1440px) {
    font-size: var(--desktop-text-size-xs);
  }
`;
