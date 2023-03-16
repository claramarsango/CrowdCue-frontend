export interface User {
  id: number;
  email: string;
  password: string;
  imageURL: string;
  inSession: string;
}

export type UserCredentials = Pick<User, 'email' | 'password'>;

export interface AuthResponse {
  message: string;
  accessToken: string;
}
