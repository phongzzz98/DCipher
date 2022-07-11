import { AnyAction, configureStore, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import achievementSlice from "../redux/reducers/AchievementReducer";
import authSlice from "../redux/reducers/AuthReducer";
import loadingSlice from "../redux/reducers/LoadingReducer";
import postSlice from "../redux/reducers/PostReducer";
import tagSlice from "../redux/reducers/TagReducer";
import userSlice from "../redux/reducers/UserReducer";

export const store = configureStore({
  reducer: {
    authSlice,
    loadingSlice,
    postSlice,
    tagSlice,
    userSlice,
    achievementSlice,
  },
});
export type ApplicationDispatch = ThunkDispatch<any, void, AnyAction> & Dispatch
export type RootState = ReturnType<typeof store.getState>;
