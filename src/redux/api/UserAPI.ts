import { axiosInstance } from "../../configs/axios";

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
