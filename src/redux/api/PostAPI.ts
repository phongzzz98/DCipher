import { axiosInstance } from "../../configs/axios";
import { IApprovePost, ICreatePost, IEditComment, IEditPost } from "../interface/PostType";

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

export const deletePostAPI = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/post/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editPostAPI = async (data: IEditPost) => {
  try {
    const res = await axiosInstance.put(`/post/${data.id}`, {
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

export const approvePostAPI = async (data: IApprovePost) => {
  try {
    const res = await axiosInstance.put(`post/status/${data.id}`, {
      status: data.status,
      id: data.id, 
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const unapprovePostAPI = async (data: IApprovePost) => {
  try {
    const res = await axiosInstance.put(`post/status/${data.id}`, {
      status: data.status,
      id: data.id, 
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
    const searchValue = value.split(',')
    const res = await axiosInstance.post(`/searchpostbytag`, {
      search: searchValue
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getAllCommentAPI = async () => {
  try {
    const res = await axiosInstance.get(`/comment`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editCommentAPI = async (data: IEditComment) => {
  try {
    const res = await axiosInstance.put(`/comment/${data.id}`, {
      content: data.content,
      votenumber: data.votenumber
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const deleteCommentAPI = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/comment/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};