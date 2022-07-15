import { AnyAction, configureStore, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import achievementSlice from "../redux/reducers/AchievementReducer";
import authSlice from "../redux/reducers/AuthReducer";
import contestSlice from "../redux/reducers/ContestReducer";
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
    contestSlice,
  },
});
export type ApplicationDispatch = ThunkDispatch<any, void, AnyAction> & Dispatch
export type RootState = ReturnType<typeof store.getState>;
