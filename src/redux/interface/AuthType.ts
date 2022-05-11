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
  accessToken: null | string;
  user: IUserInfo;
}

export interface IUserInfo {
  created_at: string;
  email: string;
  email_verified_at: null | string;
  id: number;
  role: number;
  updated_at: string;
  username: string;
}
