import { LoginResponse, UserLogin } from '../../models/user-model';

const logInUser = async (userToLog: UserLogin) => {
  const response = await fetch(
    'https://clara-marsango-final-project-back-202301.onrender.com/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userToLog),
    },
  );

  const userToken: LoginResponse = await response.json();

  return userToken;
};

export default logInUser;
