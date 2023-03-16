import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import Loading from '../../../../../shared/components/Loading';
import { checkForRegisteredUser, selectResponseState } from '../../auth-slice';
import { Form, RegisterLink } from '../../authFormStyled';

const RegisterForm = () => {
  const responseState = useAppSelector(selectResponseState);
  const { registerMsg, registerState, status } = responseState;
  const dispatch = useAppDispatch();
  return (
    <>
      <Form
        onSubmit={event => {
          event.preventDefault();
          dispatch(checkForRegisteredUser(event.currentTarget));
        }}
      >
        <div className="form__inputs">
          <div className="form__email-field">
            <label htmlFor="email" className="email__title">
              Email
            </label>
            <input
              className="email__input"
              type="text"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="form__password-field">
            <label htmlFor="password" className="password__title">
              Password
            </label>
            <input
              className="password__input"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="form__confirm-password-field">
            <label
              htmlFor="confirmedPassword"
              className="confirm-password__title"
            >
              Confirm password
            </label>
            <input
              className="confirm-password__input"
              type="password"
              id="confirmedPassword"
              name="confirmedPassword"
              required
            />

            <p
              className={`form__error ${
                registerState === 'error' ? '' : 'form__error--hidden'
              }`}
              role="paragraph"
            >
              {registerMsg}
            </p>
          </div>
        </div>

        <button className="form__submit-button" type="submit">
          <span className="button__text">
            {status !== 'loading' ? <span>Sign up</span> : <Loading />}
          </span>
        </button>
      </Form>
      <RegisterLink>
        Already have an account?{' '}
        <span className="login-account__link">Log in</span>
      </RegisterLink>
    </>
  );
};

export default RegisterForm;
