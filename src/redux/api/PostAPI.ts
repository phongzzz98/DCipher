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

export const getMostVotedPostAPI = async () => {
  try {
    const res = await axiosInstance.get(`/sortpostbyvote`);
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
      language: data.language,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const searchPostAPI = async (value: string) => {
  try {
    const res = await axiosInstance.post(`/searchpost`, {
      search: value
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const searchPostByTagAPI = async (value: string) => {
  try {
    const res = await axiosInstance.post(`/searchpostbytag`, {
      search: [value]
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};