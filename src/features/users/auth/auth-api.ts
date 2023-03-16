import {
  UserLoginCredentials,
  UserRegisterCredentials,
} from '../../../models/user-model';

export const registerUser = async (userToRegister: UserRegisterCredentials) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToRegister),
    },
  );
  return response;
};

export const logInUser = async (userToLog: UserLoginCredentials) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userToLog),
  });
  return response;
};
