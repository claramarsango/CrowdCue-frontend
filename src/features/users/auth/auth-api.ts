import { UserCredentials } from '../../../models/user-model';

export const logInUser = async (userToLog: UserCredentials) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userToLog),
  });
  return response;
};
