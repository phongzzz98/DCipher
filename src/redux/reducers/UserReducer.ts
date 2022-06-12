import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { IUserState } from "../interface/UserType";
import {
  getNotificationAction,
  getUserDetailsAction,
  seeUserCommentAction,
  seeUserPostAction,
} from "../actions/UserAction";

const initialState: IUserState = {
  notification: [],
  userDetail: {
    about: "",
    avatarImage: "",
    birth: "",
    displayname: "",
    fullName: "",
    linkSNS: [
      {
        facebook_account: "",
        linkedin_account: "",
        twitter_account: "",
      },
    ],
    notification: 0,
    score: 0,
    user_follow: [
      {
        userid: 0,
        displayname: "",
        avatarImage: "",
        score: 0,
      },
    ],
    user_following: [
      {
        userid: 0,
        displayname: "",
        avatarImage: "",
        score: 0,
      },
    ],
    userid: 0,
  },
  userPosts: [],
  userComments: [],
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsAction.fulfilled, (state, action) => {
        state.userDetail = action.payload[0];
      })
      .addCase(getUserDetailsAction.rejected, () => {
        notification.error({
          message: "Get user detail failed!",
        });
      });
    builder
      .addCase(getNotificationAction.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(getNotificationAction.rejected, () => {
        notification.error({
          message: "Get notification failed!",
        });
      });
    builder
      .addCase(seeUserPostAction.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      })
      .addCase(seeUserPostAction.rejected, () => {
        notification.error({
          message: "Get user posts failed!",
        });
      });
    builder
      .addCase(seeUserCommentAction.fulfilled, (state, action) => {
        state.userComments = action.payload;
      })
      .addCase(seeUserCommentAction.rejected, () => {
        notification.error({
          message: "Get user comments failed!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.userSlice;

export const userStateSelector = createSelector(selectSelf, (state) => state);
export const userDetailSelector = createSelector(
  selectSelf,
  (state) => state.userDetail
);
export const notificationSelector = createSelector(
  selectSelf,
  (state) => state.notification
);
export const userPostsSelector = createSelector(
  selectSelf,
  (state) => state.userPosts
);
export const userCommentsSelector = createSelector(
  selectSelf,
  (state) => state.userComments
);

export default userSlice.reducer;
