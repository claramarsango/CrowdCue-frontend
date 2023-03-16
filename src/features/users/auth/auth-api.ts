import { UserCredentials } from '../../../models/user-model';

const logInUser = async (userToLog: UserCredentials) => {
  const response = await fetch(
    'https://clara-marsango-final-project-back-202301.onrender.com/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToLog),
    },
  );
  return response;
};

export default logInUser;
