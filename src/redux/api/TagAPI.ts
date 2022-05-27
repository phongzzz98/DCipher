import { axiosInstance } from "../../configs/axios";
import { ICreateTag } from "../interface/TagType";

export const getAllTagAPI = async () => {
  try {
    const res = await axiosInstance.get(`/tag`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const createTagAPI = async (data: ICreateTag) => {
  try {
    const res = await axiosInstance.post(`/tag`, {
      content: data.content,
      colorcode: data.colorcode,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};
