import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPostAPI, getAllPostAPI, getMostVotedPostAPI, getOnePostAPI, searchPostAPI, searchPostByTagAPI } from "../api/PostAPI";
import { ICreatePost } from "../interface/PostType";

export const getAllPostAction = createAsyncThunk(
  "getAllPost",
  async () => {
    const res = await getAllPostAPI();
    return res;
  }
);

export const getMostVotedPostAction = createAsyncThunk(
  "getMostVotedPost",
  async () => {
    const res = await getMostVotedPostAPI();
    return res;
  }
);

export const getOnePostAction = createAsyncThunk(
  "getOnePost",
  async (id: string | undefined) => {
    const res = await getOnePostAPI(id);
    return res;
  }
);

export const createPostAction = createAsyncThunk(
  "createPost",
 async (data:ICreatePost) => {
   const res = await createPostAPI(data);
   return res
 }
)

export const searchPostAction = createAsyncThunk(
  "searchPost",
 async (value: string) => {
   const res = await searchPostAPI(value);
   return res
 }
)

export const searchPostByTagAction = createAsyncThunk(
  "searchPostByTag",
 async (value: string) => {
   const res = await searchPostByTagAPI(value);
   return res
 }
)