export type ILogin = {
  email: string;
  password: string;
};

export type ISignUp = {
  email: string;
  username: string;
  password: string;
  role: number;
};

export interface IAuthState {
  username: string;
  email: string;
  accessToken: null | string;
  role: null | string;
  id: number;
}
