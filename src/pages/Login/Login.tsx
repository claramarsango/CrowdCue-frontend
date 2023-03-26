import LoginForm from '../../features/users/auth/components/login-form/LoginForm';
import { PageTitle } from '../../shared/styles/shared-styled';
const Login = () => {
  return (
    <>
      <PageTitle data-testid="heading">LOG IN</PageTitle>
      <LoginForm />
    </>
  );
};

export default Login;
