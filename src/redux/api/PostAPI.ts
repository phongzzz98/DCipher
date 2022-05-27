import { axiosInstance } from "../../configs/axios";
import { ICreatePost } from "../interface/PostType";

export const getAllPostAPI = async () => {
  try {
    const res = await axiosInstance.get(`/post`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getOnePostAPI = async (id: string | undefined) => {
  try{
    if(id === undefined)
     return;
    else{
      const res = await axiosInstance.get(`/post/${id}`)
      console.log(res)
      return res.data
    }
  } catch (error: any) {
    return error.res.data
  }
};

export const createPostAPI = async (data: ICreatePost) => {
  try {
    const res = await axiosInstance.post(`/post`, {
      title: data.title,
      content: data.content,
      code: data.code,
      tagid: data.tagid,
      userid: data.userid,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};
