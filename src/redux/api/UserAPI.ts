import { axiosInstance } from "../../configs/axios";
import { IFollowData, IUserDetailsToSave } from "../interface/UserType";

export const getAllUserAPI = async () => {
  try {
    const res = await axiosInstance.get(`/userdetails/public`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getOneUserAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/userdetails/info/public/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getUserDetailsAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/userdetails/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getNotificationAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/userdetails/notification/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const seeUserPostAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/userdetails/seepost/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const seeUserCommentAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/userdetails/seecomment/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const seeUserBookmarkAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/userdetails/seebookmark/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editUserDetailAPI = async (
  id: number,
  data: IUserDetailsToSave
) => {
  try {
    const res = await axiosInstance.put(`/userdetails/${id}`, {
      avatarImage: data.avatarImage,
      userid: id,
      displayname: data.displayname,
      about: data.about,
      fullname: data.fullname,
      birth: data.birth,
      linkSNS: data.linkSNS,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const followUserAPI = async (data: IFollowData) => {
  try {
    const res = await axiosInstance.post(`/follow`, {
      user_id: data.user_id,
      user_follow_id: data.user_follow_id,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const unfollowUserAPI = async (data: IFollowData) => {
  try {
    const res = await axiosInstance.delete(`/unfollow`, {
      data: {
        user_id: data.user_id,
        user_follow_id: data.user_follow_id,
      }
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};