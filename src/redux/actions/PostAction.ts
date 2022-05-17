import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPostAPI, getAllPostAPI } from "../api/PostAPI";
import { ICreatePost } from "../interface/PostType";

export const getAllPostAction = createAsyncThunk(
  "getAllPost",
  async () => {
    const res = await getAllPostAPI();
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