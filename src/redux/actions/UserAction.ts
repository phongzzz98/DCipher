import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUserAPI,
  getNotificationAPI,
  getUserDetailsAPI,
  seeUserBookmarkAPI,
  seeUserCommentAPI,
  seeUserPostAPI,
} from "../api/UserAPI";

export const getAllUsersAction = createAsyncThunk(
  "getAllUsers",
  async () => {
    const res = await getAllUserAPI();
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

