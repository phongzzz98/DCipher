import { AnyAction, configureStore, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import authSlice from "../redux/reducers/AuthReducer";
import loadingSlice from "../redux/reducers/LoadingReducer";

export const store = configureStore({
  reducer: {
    authSlice,
    loadingSlice
  },
});
export type ApplicationDispatch = ThunkDispatch<any, void, AnyAction> & Dispatch
export type RootState = ReturnType<typeof store.getState>;
