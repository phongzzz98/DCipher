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
      description: data.description,
      icon_class: data.icon_class,
      status: data.status,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};
