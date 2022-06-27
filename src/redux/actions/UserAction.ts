import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editUserDetailAPI,
  followUserAPI,
  getAllUserAPI,
  getNotificationAPI,
  getOneUserAPI,
  getUserDetailsAPI,
  seeUserBookmarkAPI,
  seeUserCommentAPI,
  seeUserPostAPI,
  unfollowUserAPI,
} from "../api/UserAPI";
import { IFollowData, IUserDetailsToSave } from "../interface/UserType";

export const getAllUsersAction = createAsyncThunk(
  "getAllUsers",
  async () => {
    const res = await getAllUserAPI();
    return res;
  }
);

export const getOneUsersAction = createAsyncThunk(
  "getOneUser",
  async (id: number) => {
    const res = await getOneUserAPI(id);
    return res;
  }
);

export const getUserDetailsAction = createAsyncThunk(
  "getUserDetails",
  async (id: number) => {
    const res = await getUserDetailsAPI(id);
    return res;
  }
);

export const getNotificationAction = createAsyncThunk(
  "getNotification",
  async (id: number) => {
    const res = await getNotificationAPI(id);
    return res;
  }
);

export const seeUserPostAction = createAsyncThunk(
  "seeUserPost",
  async (id: number) => {
    const res = await seeUserPostAPI(id);
    return res;
  }
);

export const seeUserCommentAction = createAsyncThunk(
  "seeUserComment",
  async (id: number) => {
    const res = await seeUserCommentAPI(id);
    return res;
  }
);

export const seeUserBookmarkAction = createAsyncThunk(
  "seeUserBookmark",
  async (id: number) => {
    const res = await seeUserBookmarkAPI(id);
    return res;
  }
);

export const editUserDetailAction = createAsyncThunk(
  "editUserDetail",
  async (data: IUserDetailsToSave) => {
    const res = await editUserDetailAPI(data.userid, data);
    return res;
  }
);

export const followUserAction = createAsyncThunk(
  "followUser",
  async (data: IFollowData) => {
    const res = await followUserAPI(data);
    return res;
  }
);

export const unfollowUserAction = createAsyncThunk(
  "unfollowUser",
  async (data: IFollowData) => {
    const res = await unfollowUserAPI(data);
    return res;
  }
);

