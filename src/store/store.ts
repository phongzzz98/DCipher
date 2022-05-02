import { AnyAction, configureStore, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import { ILogin } from "../redux/interface/AuthType";
import authSlice from "../redux/reducers/AuthReducer";

export const store = configureStore({
  reducer: {
    authSlice,
  },
});
export type ApplicationDispatch = ThunkDispatch<any, void, AnyAction> & Dispatch
export type RootState = ReturnType<typeof store.getState>;
