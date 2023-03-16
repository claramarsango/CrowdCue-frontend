export interface User {
  id: number;
  email: string;
  password: string;
  imageURL: string;
  inSession: string;
}

export type UserLoginCredentials = Pick<User, 'email' | 'password'>;

export interface UserRegisterCredentials extends UserLoginCredentials {
  confirmedPassword: string;
}

export interface AuthResponse {
  msg: string;
  accessToken: string;
}
