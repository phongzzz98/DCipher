import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { IUserState } from "../interface/UserType";
import {
  createUsersAction,
  deleteUsersAction,
  editPasswordAdminAction,
  editPasswordUserAction,
  editUserAdminAction,
  editUserDetailAction,
  followUserAction,
  getAllUsersAction,
  getAllUsersAdminAction,
  getNotificationAction,
  getOneUserAdminAction,
  getOneUsersAction,
  getUserDetailsAction,
  seeUserBookmarkAction,
  seeUserCommentAction,
  seeUserPostAction,
  unfollowUserAction,
} from "../actions/UserAction";

const initialState: IUserState = {
  users: [],
  usersAdmin: [],
  oneUserInfo: {
    userid: 0,
    displayname: "",
    created_at: "",
    about: "",
    avatarImage: "",
    linkSNS: [
      {
        facebook_account: "",
        twitter_account: "",
        linkedin_account: "",
      },
    ],
    score: 0,
    number_of_post: 0,
    number_of_comment: 0,
    post_created: [],
    user_follow: [],
    number_of_followers: 0,
  },
  oneUserAdmin: {
    about: "",
    avatarImage: "",
    birth: "",
    created_at: "",
    displayname: "",
    email: "",
    facebook_account: "",
    fullName: "",
    linkedin_account: "",
    notification: 0,
    role: 1,
    score: 0,
    twitter_account: "",
    updated_at: "",
    user_id: 0,
    username: "",
    verify_email: false,
  },
  notification: [],
  userDetail: {
    about: "",
    avatarImage: "",
    birth: "",
    displayname: "",
    fullName: "",
    created_at: "",
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
  userBookmarks: [],
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUsersAction.rejected, () => {
        notification.error({
          message: "Get users failed!",
        });
      });
    builder
      .addCase(createUsersAction.fulfilled, () => {
        notification.success({
          message: "Tạo người dùng thành công!",
        });
      })
      .addCase(createUsersAction.rejected, () => {
        notification.error({
          message: "Lỗi khi tạo người dùng! Có thể email bị trùng lặp!",
        });
      });
    builder
      .addCase(editUserAdminAction.fulfilled, () => {
        notification.success({
          message: "Sửa thông tin thành công!",
        });
      })
      .addCase(editUserAdminAction.rejected, () => {
        notification.error({
          message: "Lỗi khi sửa người dùng!",
        });
      });
    builder
      .addCase(editPasswordAdminAction.fulfilled, () => {
        notification.success({
          message: "Đổi mật khẩu thành công!",
        });
      })
      .addCase(editPasswordAdminAction.rejected, () => {
        notification.error({
          message: "Lỗi khi đổi mật khẩu!",
        });
      });
    builder
      .addCase(editPasswordUserAction.fulfilled, () => {
        notification.success({
          message: "Đổi mật khẩu thành công!",
        });
      })
      .addCase(editPasswordUserAction.rejected, () => {
        notification.error({
          message: "Lỗi khi đổi mật khẩu! Hãy kiểm tra lại mật khẩu cũ",
        });
      });
    builder
      .addCase(deleteUsersAction.fulfilled, () => {
        notification.success({
          message: "Xóa người dùng thành công!",
        });
      })
      .addCase(deleteUsersAction.rejected, () => {
        notification.error({
          message: "Lỗi khi xóa người dùng!",
        });
      });
    builder
      .addCase(getAllUsersAdminAction.fulfilled, (state, action) => {
        state.usersAdmin = action.payload;
      })
      .addCase(getAllUsersAdminAction.rejected, () => {
        notification.error({
          message: "Get users failed!",
        });
      });
    builder
      .addCase(getOneUsersAction.fulfilled, (state, action) => {
        state.oneUserInfo = action.payload[0];
      })
      .addCase(getOneUsersAction.rejected, () => {
        notification.error({
          message: "Get user failed!",
        });
      });
    builder
      .addCase(getOneUserAdminAction.fulfilled, (state, action) => {
        state.oneUserAdmin = action.payload[0];
      })
      .addCase(getOneUserAdminAction.rejected, () => {
        notification.error({
          message: "Get user failed!",
        });
      });
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
    builder
      .addCase(seeUserBookmarkAction.fulfilled, (state, action) => {
        state.userBookmarks = action.payload;
      })
      .addCase(seeUserBookmarkAction.rejected, () => {
        notification.error({
          message: "Get user bookmark failed!",
        });
      });
    builder
      .addCase(editUserDetailAction.fulfilled, () => {
        notification.success({
          message: "Chỉnh sửa thành công!",
        });
      })
      .addCase(editUserDetailAction.rejected, () => {
        notification.error({
          message: "Lỗi khi chỉnh sửa thông tin cá nhân!",
        });
      });
    builder
      .addCase(followUserAction.fulfilled, () => {
        notification.success({
          message: "Đã theo dõi!",
        });
      })
      .addCase(followUserAction.rejected, () => {
        notification.error({
          message: "Follow failed!",
        });
      });
    builder
      .addCase(unfollowUserAction.fulfilled, () => {
        notification.success({
          message: "Đã bỏ theo dõi!",
        });
      })
      .addCase(unfollowUserAction.rejected, () => {
        notification.error({
          message: "Unfollow failed!",
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
export const userBookmarksSelector = createSelector(
  selectSelf,
  (state) => state.userBookmarks
);
export const allUsersSelector = createSelector(
  selectSelf,
  (state) => state.users
);
export const allUsersAdminSelector = createSelector(
  selectSelf,
  (state) => state.usersAdmin
);
export const oneUserSelector = createSelector(
  selectSelf,
  (state) => state.oneUserInfo
);
export const oneUserAdminSelector = createSelector(
  selectSelf,
  (state) => state.oneUserAdmin
);

export default userSlice.reducer;
