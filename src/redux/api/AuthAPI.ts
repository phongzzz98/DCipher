import { axiosInstance } from "../../configs/axios";
import { ILogin, ISignUp } from "../interface/AuthType";

export const loginAPI = async ({ email, password }: ILogin) => {
  try {
    const res = await axiosInstance.post(`/login`, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const logoutAPI = async (accessToken: string) => {
  try {
    const res = await axiosInstance.post(`/logout`, accessToken);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const signUpAPI = async (data: ISignUp) => {
  try {
    const res = await axiosInstance.post(`/register`, {
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getUserLoginInfoAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/api/users/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};
