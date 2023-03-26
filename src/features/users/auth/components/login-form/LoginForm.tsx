import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import Loading from '../../../../../shared/components/loading/Loading';
import { checkForExistingUser, selectResponseState } from '../../auth-slice';
import { AuthForm, RegisterLink } from '../../auth-form-styled';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginForm = () => {
  const responseState = useAppSelector(selectResponseState);
  const { loginMsg, loginState, status } = responseState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState === 'success') navigate('/');
  }, [loginState, navigate, status]);

  return (
    <>
      <AuthForm
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
                loginState === 'error' ? '' : 'form__error--hidden'
              }`}
              role="paragraph"
            >
              {loginMsg}
            </p>
          </div>
        </div>

        <button
          className="form__submit-button"
          type="submit"
          disabled={status === 'loading' ? true : false}
        >
          <span className="button__text">
            {status !== 'loading' ? (
              <span>Sign in</span>
            ) : (
              <Loading container="button" />
            )}
          </span>
        </button>
      </AuthForm>
      <RegisterLink className="login__register-account">
        Don’t have an account?{' '}
        <Link to="/auth/register" className="form__link">
          <span className="register-account__link">Register</span>
        </Link>
      </RegisterLink>
    </>
  );
};

export default LoginForm;
