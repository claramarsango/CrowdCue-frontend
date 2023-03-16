import RegisterForm from '../../features/users/auth/components/register-form/RegisterForm';
import { PageTitle } from '../../shared/styles/PageTitleStyled';

const Register = () => {
  return (
    <>
      <PageTitle data-testid="heading">REGISTER</PageTitle>
      <RegisterForm />
    </>
  );
};

export default Register;
