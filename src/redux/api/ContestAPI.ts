import { axiosInstance } from "../../configs/axios";
import { IStatisticDetailIDs, IStatisticIDs, ISubmitProblem } from "../interface/ContestType";

export const getAllProblemAPI = async () => {
  try {
    const res = await axiosInstance.get(`/problems`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getAllProblemAdminAPI = async () => {
  try {
    const res = await axiosInstance.get(`/admin/problems`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getOneProblemAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/problems/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const deleteProblemAPI = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/problems/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getProblemStatisticAPI = async (data: IStatisticIDs) => {
  try {
    const res = await axiosInstance.get(`/statistic/${data.uid}/${data.pid}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getStatisticDetailAPI = async (data: IStatisticDetailIDs) => {
  try {
    const res = await axiosInstance.get(`/compiledetails/${data.uid}/${data.cid}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const submitProblemAPI = async (data: ISubmitProblem) => {
  try {
    const res = await axiosInstance.post(`/submit`, {
      user_id: data.user_id,
      problem_id: data.problem_id,
      code: data.code,
      language: data.language
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

