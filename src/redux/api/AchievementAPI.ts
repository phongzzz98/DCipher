import { axiosInstance } from "../../configs/axios";
import { ICreateRank, IEditRank } from "../interface/AchievementType";

export const getAllRankAPI = async () => {
  try {
    const res = await axiosInstance.get(`/score`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const getOneRankAPI = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/score/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const createRankAPI = async (data: ICreateRank) => {
  try {
    const res = await axiosInstance.post(`/score`, {
      min_score: data.min_score,
      max_score: data.max_score,
      about: data.about,
      rank: data.rank,
      colorcode: data.colorcode,
      score: data.min_score,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const editRankAPI = async (data: IEditRank) => {
  try {
    const res = await axiosInstance.put(`/score/${data.id}`, {
      min_score: data.min_score,
      max_score: data.max_score,
      about: data.about,
      rank: data.rank,
      colorcode: data.colorcode,
      score: data.min_score,
    });
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};

export const deleteRankAPI = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/score/${id}`);
    return res.data;
  } catch (error: any) {
    return error.res.data;
  }
};
