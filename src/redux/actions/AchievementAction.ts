import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRankAPI, deleteRankAPI, editRankAPI, getAllRankAPI, getOneRankAPI } from "../api/AchievementAPI";
import { ICreateRank, IEditRank } from "../interface/AchievementType";

export const getAllRankAction = createAsyncThunk(
  "getAllAchievement",
  async () => {
    const res = await getAllRankAPI();
    return res;
  }
);

export const getOneRankAction = createAsyncThunk(
  "getOneAchievement",
  async (id: number) => {
    const res = await getOneRankAPI(id);
    return res;
  }
);

export const createRankAction = createAsyncThunk(
  "createAchievement",
  async (data: ICreateRank) => {
    const res = await createRankAPI(data);
    return res;
  }
);

export const editRankAction = createAsyncThunk(
  "editAchievement",
  async (data: IEditRank) => {
    const res = await editRankAPI(data);
    return res;
  }
);

export const deleteRankAction = createAsyncThunk(
  "deleteAchievement",
  async (id: number) => {
    const res = await deleteRankAPI(id);
    return res;
  }
);