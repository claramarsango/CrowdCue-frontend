import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loading from '../../shared/components/Loading';
import {
  checkForExistingUser,
  selectResponseState,
  selectSubmitState,
} from './loginFormSlice';
import { Form, RegisterLink } from './loginFormStyled';

const LoginForm = () => {
  const submitState = useAppSelector(selectSubmitState);
  const responseState = useAppSelector(selectResponseState);
  const dispatch = useAppDispatch();

  return (
    <>
      <Form
        onSubmit={event => {
          event.preventDefault();
          dispatch(checkForExistingUser(event.currentTarget));
        }}
      >
        <div className="form__inputs">
          <div className="form__email-field">
            <label htmlFor="email" className="email__title">
              Email
            </label>
            <input className="email__input" type="text" id="email" required />
          </div>

          <div className="form__password-field">
            <label htmlFor="password" className="password__title">
              Password
            </label>
            <input
              className="password__input"
              type="password"
              id="password"
              required
            />
          </div>
        </div>

        <p
          className={`form__error ${
            submitState === 'error' ? '' : 'form__error--hidden'
          }`}
        >
          This email and password are incorrect
        </p>

        <button className="form__submit-button" type="submit">
          <span className="button__text">
            {responseState !== 'loading' ? <span>Sign in</span> : <Loading />}
          </span>
        </button>
      </Form>
      <RegisterLink className="login__register-account">
        Don’t have an account?{' '}
        <span className="register-account__link">Register</span>
      </RegisterLink>
    </>
  );
};

export default LoginForm;
