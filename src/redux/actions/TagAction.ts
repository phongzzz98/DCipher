import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTagAPI, deleteTagAPI, editTagAPI, getAllTagAPI, getOneTagAPI } from "../api/TagAPI";
import { ICreateTag, IEditTag } from "../interface/TagType";

export const getAllTagAction = createAsyncThunk(
  "getAllTag",
  async () => {
    const res = await getAllTagAPI();
    return res;
  }
);

export const getOneTagAction = createAsyncThunk(
  "getOneTag",
  async (id: number) => {
    const res = await getOneTagAPI(id);
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

export const editTagAction = createAsyncThunk(
  "editTag",
 async (data:IEditTag) => {
   const res = await editTagAPI(data);
   return res
 }
)

export const deleteTagAction = createAsyncThunk(
  "deleteTag",
 async (id: number) => {
   const res = await deleteTagAPI(id);
   return res
 }
)