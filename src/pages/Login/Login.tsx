import LoginForm from '../../features/users/auth/components/login-form/LoginForm';
import { PageTitle } from '../../shared/styles/PageTitleStyled';
const Login = () => {
  return (
    <>
      <PageTitle data-testid="heading">LOG IN</PageTitle>
      <LoginForm />
    </>
  );
};

export default Login;
