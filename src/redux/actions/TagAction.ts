import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTagAPI, getAllTagAPI } from "../api/TagAPI";
import { ICreateTag } from "../interface/TagType";

export const getAllTagAction = createAsyncThunk(
  "getAllTag",
  async () => {
    const res = await getAllTagAPI();
    return res;
  }
);

export const createTagAction = createAsyncThunk(
  "createTag",
 async (data:ICreateTag) => {
   const res = await createTagAPI(data);
   return res
 }
)