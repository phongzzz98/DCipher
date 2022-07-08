import { axiosInstance } from "../../configs/axios";
import { ICreateTag, IEditTag } from "../interface/TagType";

export const getAllTagAPI = async () => {
  try {
    const res = await axiosInstance.get(`/tag`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getOneTagAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/tag/${id}`);
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

export const editTagAPI = async (data: IEditTag) => {
  try {
    const res = await axiosInstance.put(`/tag/${data.id}`, {
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

export const deleteTagAPI = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/tag/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};