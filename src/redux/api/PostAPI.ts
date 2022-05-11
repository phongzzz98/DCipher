import { axiosInstance } from "../../configs/axios";

export const getAllPostAPI = async () => {
  try {
    const res = await axiosInstance.get(`/post`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};