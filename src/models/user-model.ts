export interface User {
  id: number;
  email: string;
  password: string;
  imageURL: string;
  inSession: string;
}

export type UserLoginCredentials = Pick<User, 'email' | 'password'>;

export type UserRegisterCredentials =
  | Pick<User, 'email' | 'password'>
  | 'confirmPassword';

export interface AuthResponse {
  msg: string;
  accessToken: string;
}
