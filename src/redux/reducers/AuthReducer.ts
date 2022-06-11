import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  getRole,
  getUserInfo,
  setAccessToken,
  setRole,
  setUserInfo,
} from "../../utils/localStorage";
import { IAuthState } from "../interface/AuthType";
import { RootState } from "../../store/store";
// import { getUserLoginInfoAction, loginAction } from "../actions/LoginAction";
import { notification } from "antd";
import {
  getUserLoginInfoAction,
  loginAction,
  signUpAction,
} from "../actions/AuthAction";

const initialState: IAuthState = {
  accessToken: localStorage.getItem("accessToken") || "",
  user: getUserInfo() || {
    created_at: "",
    email: "",
    email_verified_at: null,
    id: 0,
    role: 0,
    updated_at: "",
    username: "",
  },
};

export const authSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.user = {
        created_at: "",
        email: "",
        email_verified_at: null,
        id: 0,
        role: 0,
        updated_at: "",
        username: "Anonymous",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
        setAccessToken(action.payload.token);
        setUserInfo(action.payload.user);
        notification.success({
          message: "Login Success!",
        });
      })
      .addCase(loginAction.rejected, () => {
        notification.error({
          message: "You shall not pass!",
        });
      });
    // builder.addCase(getUserLoginInfoAction.fulfilled, (state, action) => {
    //   state.userInfo = action.payload.data[0]
    //   setUserInfo(action.payload.data[0])
    // });
    builder
      .addCase(signUpAction.fulfilled, () => {
        notification.success({
          message: "Sign Up Success!",
        });
      })
      .addCase(signUpAction.rejected, () => {
        notification.error({
          message: "Sign up failed!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.authSlice;

export const authStateSelector = createSelector(selectSelf, (state) => state);
export const accessTokenSelector = createSelector(
  selectSelf,
  (state) => state.accessToken
);
export const userInfoSelector = createSelector(
  selectSelf,
  (state) => state.user
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
