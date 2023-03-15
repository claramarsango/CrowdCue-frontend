export interface User {
  id: number;
  email: string;
  password: string;
  imageURL: string;
  inSession: string;
}

export type UserLogin = Pick<User, 'email' | 'password'>;

export interface LoginResponse {
  accessToken: string;
}
