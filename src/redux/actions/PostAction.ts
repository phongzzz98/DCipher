import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostAPI } from "../api/PostAPI";

export const getAllPostAction = createAsyncThunk(
  "getAllPost",
  async () => {
    const res = await getAllPostAPI();
    return res;
  }
);
