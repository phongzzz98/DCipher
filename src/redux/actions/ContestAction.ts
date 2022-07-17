import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProblemAPI,
  deleteProblemAPI,
  editProblemAPI,
  getAllProblemAdminAPI,
  getAllProblemAPI,
  getOneProblemAdminAPI,
  getOneProblemAPI,
  getProblemStatisticAPI,
  getStatisticDetailAPI,
  submitProblemAPI,
} from "../api/ContestAPI";
import {
  ICreateProblem,
  IEditProblem,
  IStatisticDetailIDs,
  IStatisticIDs,
  ISubmitProblem,
} from "../interface/ContestType";

export const getAllProblemAction = createAsyncThunk(
  "getAllProblem",
  async () => {
    const res = await getAllProblemAPI();
    return res;
  }
);

export const getAllProblemAdminAction = createAsyncThunk(
  "getAllProblemAdmin",
  async () => {
    const res = await getAllProblemAdminAPI();
    return res;
  }
);

export const deleteProblemAction = createAsyncThunk(
  "deleteProblem",
  async (id: number) => {
    const res = await deleteProblemAPI(id);
    return res;
  }
);

export const getOneProblemAction = createAsyncThunk(
  "getOneProblem",
  async (id: number) => {
    const res = await getOneProblemAPI(id);
    return res;
  }
);

export const getOneProblemAdminAction = createAsyncThunk(
  "getOneProblemAdmin",
  async (id: number) => {
    const res = await getOneProblemAdminAPI(id);
    console.log(res)
    return res;
  }
);

export const getProblemStatisticAction = createAsyncThunk(
  "getStatistic",
  async (data: IStatisticIDs) => {
    const res = await getProblemStatisticAPI(data);
    return res;
  }
);

export const getProblemStatisticDetailAction = createAsyncThunk(
  "getStatisticDetail",
  async (data: IStatisticDetailIDs) => {
    const res = await getStatisticDetailAPI(data);
    return res;
  }
);

export const createProblemAction = createAsyncThunk(
  "createProblem",
  async (data: ICreateProblem) => {
    const res = await createProblemAPI(data);
    return res;
  }
);

export const editProblemAction = createAsyncThunk(
  "editProblem",
  async (data: IEditProblem) => {
    const res = await editProblemAPI(data);
    return res;
  }
);

export const submitProblemAction = createAsyncThunk(
  "submitProblem",
  async (data: ISubmitProblem) => {
    const res = await submitProblemAPI(data);
    return res;
  }
);
