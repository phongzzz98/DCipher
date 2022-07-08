import { axiosInstance } from "../../configs/axios";
import {
  ICreateUser,
  IEditPasswordAdmin,
  IEditPasswordUser,
  IEditUser,
  IFollowData,
  IUserDetailsToSave,
} from "../interface/UserType";

export const getAllUserAPI = async () => {
  try {
    const res = await axiosInstance.get(`/userdetails/public`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getAllUserAdminAPI = async () => {
  try {
    const res = await axiosInstance.get(`/user`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const createUserAPI = async (data: ICreateUser) => {
  try {
    const res = await axiosInstance.post(`/user`, {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
      verify_email: data.verify_email,
      about: data.about,
      avatarImage: data.avatarImage,
      fullName: data.fullName,
      birth: data.birth,
      score: data.score,
      notification: data.notification,
      facebook_account: data.facebook_account,
      twitter_account: data.twitter_account,
      linkedin_account: data.linkedin_account,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editUserAdminAPI = async (data: IEditUser) => {
  try {
    const res = await axiosInstance.put(`/updateuserinfo/${data.userid}`, {
      username: data.username,
      role: data.role,
      verify_email: data.verify_email,
      about: data.about,
      avatarImage: data.avatarImage,
      fullName: data.fullName,
      birth: data.birth,
      score: data.score,
      notification: data.notification,
      facebook_account: data.facebook_account,
      twitter_account: data.twitter_account,
      linkedin_account: data.linkedin_account,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editUserPasswordAPI = async (data: IEditPasswordAdmin) => {
  try {
    const res = await axiosInstance.post(`/user/resetpassword`, {
      user_id: data.user_id,
      password: data.password
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editUserPasswordUserAPI = async (data: IEditPasswordUser) => {
  try {
    const res = await axiosInstance.post(`/user/resetpassword`, {
      user_id: data.user_id,
      password: data.password,
      old_password: data.old_password,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const deleteUserAPI = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/user/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};



export const getOneUserAdminAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/user/${id}`);
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
      },
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};
