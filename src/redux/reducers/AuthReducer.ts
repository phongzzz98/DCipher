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
  username: "",
  email: "",
  accessToken: localStorage.getItem("accessToken"),
  role: 99,
  id: 0,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
          state.isLoading = false
          state.accessToken = action.payload.token;
          state.role = action.payload.user.role;
          state.id = action.payload.user.id;
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          setAccessToken(action.payload.token);
          setRole(action.payload.user.role);
          notification.success({
            message: "Login Success!",
          });
      })
      .addCase(loginAction.pending, (state) => {
          state.isLoading = true;
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

export const accessTokenSelector = createSelector(selectSelf, (state) => state.accessToken);
export const roleSelector = createSelector(selectSelf, (state) => state.role);
export const uidSelector = createSelector(selectSelf, (state) => state.id);
export const loadingSelector = createSelector(selectSelf, (state) => state.isLoading);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
