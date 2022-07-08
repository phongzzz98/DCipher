import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserAPI,
  deleteUserAPI,
  editUserAdminAPI,
  editUserDetailAPI,
  editUserPasswordAPI,
  editUserPasswordUserAPI,
  followUserAPI,
  getAllUserAdminAPI,
  getAllUserAPI,
  getNotificationAPI,
  getOneUserAdminAPI,
  getOneUserAPI,
  getUserDetailsAPI,
  seeUserBookmarkAPI,
  seeUserCommentAPI,
  seeUserPostAPI,
  unfollowUserAPI,
} from "../api/UserAPI";
import {
  ICreateUser,
  IEditPasswordAdmin,
  IEditPasswordUser,
  IEditUser,
  IFollowData,
  IUserDetailsToSave,
} from "../interface/UserType";

export const getAllUsersAction = createAsyncThunk("getAllUsers", async () => {
  const res = await getAllUserAPI();
  return res;
});

export const getAllUsersAdminAction = createAsyncThunk(
  "getAllUsersAdmin",
  async () => {
    const res = await getAllUserAdminAPI();
    return res;
  }
);

export const createUsersAction = createAsyncThunk(
  "createUser",
  async (data: ICreateUser) => {
    const res = await createUserAPI(data);
    return res;
  }
);

export const editUserAdminAction = createAsyncThunk(
  "editUserAdmin",
  async (data: IEditUser) => {
    const res = await editUserAdminAPI(data);
    return res;
  }
);

export const editPasswordAdminAction = createAsyncThunk(
  "editPasswordAdmin",
  async (data: IEditPasswordAdmin) => {
    const res = await editUserPasswordAPI(data);
    return res;
  }
);

export const editPasswordUserAction = createAsyncThunk(
  "editPasswordUser",
  async (data: IEditPasswordUser) => {
    const res = await editUserPasswordUserAPI(data);
    return res;
  }
);

export const deleteUsersAction = createAsyncThunk(
  "deleteUser",
  async (id: number) => {
    const res = await deleteUserAPI(id);
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

export const getOneUserAdminAction = createAsyncThunk(
  "getOneUserAdmin",
  async (id: number) => {
    const res = await getOneUserAdminAPI(id);
    console.log(res)
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
