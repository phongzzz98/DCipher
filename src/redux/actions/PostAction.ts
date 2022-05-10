import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLoginInfo, loginAPI, signUpAPI } from "../api/AuthAPI";
import { ILogin, ISignUp } from "../interface/AuthType";

export const getAllPostWithPaginationAction = createAsyncThunk(
  "getAllPost",
  async (data: ILogin) => {
    const res = await loginAPI(data);
    return res;
  }
);

export const signUpAction = createAsyncThunk(
  "auth/signUp",
 async (data:ISignUp) => {
   const res = await signUpAPI(data);
   return res
 }
)

export const getUserLoginInfoAction = createAsyncThunk(
  "auth/getUserLoginInfo",
  async (id: number) => {
    const res = await getUserLoginInfo(id);
    return res;
  }
);
