import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import Loading from '../../../../../shared/components/Loading';
import { checkForExistingUser, selectResponseState } from '../../auth-slice';
import { Form, RegisterLink } from '../../authFormStyled';

const LoginForm = () => {
  const responseState = useAppSelector(selectResponseState);
  const { authMsg, authState, status } = responseState;
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
            <p
              className={`form__error ${
                authState === 'error' ? '' : 'form__error--hidden'
              }`}
              role="paragraph"
            >
              {authMsg}
            </p>
          </div>
        </div>

        <button className="form__submit-button" type="submit">
          <span className="button__text">
            {status !== 'loading' ? <span>Sign in</span> : <Loading />}
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
