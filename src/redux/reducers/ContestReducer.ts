import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { IContestState } from "../interface/ContestType";
import {
  createProblemAction,
  deleteProblemAction,
  editProblemAction,
  getAllProblemAction,
  getAllProblemAdminAction,
  getOneProblemAction,
  getOneProblemAdminAction,
  getProblemStatisticAction,
  getProblemStatisticDetailAction,
  submitProblemAction,
} from "../actions/ContestAction";

const initialState: IContestState = {
  problems: [],
  problemsAdmin: [],
  problem: {
    title: "",
    problem_id: 0,
    content: "",
    question: "",
    input: [],
    output: [],
    rank: 0,
  },
  problemAdmin: {
    code: "",
    content: "",
    created_at: "",
    id: 0,
    input: "",
    language: "",
    output: "",
    question: "",
    rank: 0,
    score: 0,
    title: "",
    updated_at: "",
    user_id: 0,
  },
  statistic: [],
  statisticDetail: {
    code: "",
    created_at: "",
    language: "",
    problem_id: 0,
    user_id: 0,
    status: false,
    compile_details: [],
  },
};

export const contestSlice = createSlice({
  name: "contestReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProblemAction.fulfilled, (state, action) => {
        state.problems = action.payload;
      })
      .addCase(getAllProblemAction.rejected, () => {
        notification.error({
          message: "Get all problems fail!",
        });
      });
    builder
      .addCase(getOneProblemAction.fulfilled, (state, action) => {
        state.problem = action.payload[0];
      })
      .addCase(getOneProblemAction.rejected, () => {
        notification.error({
          message: "Get problems fail!",
        });
      });
    builder
      .addCase(getOneProblemAdminAction.fulfilled, (state, action) => {
        state.problemAdmin = action.payload;
      })
      .addCase(getOneProblemAdminAction.rejected, () => {
        notification.error({
          message: "Get problem fail!",
        });
      });
    builder
      .addCase(deleteProblemAction.fulfilled, () => {
        notification.success({
          message: "Xóa bài thành công!",
        });
      })
      .addCase(deleteProblemAction.rejected, () => {
        notification.error({
          message: "Lỗi khi xóa!",
        });
      });
    builder
      .addCase(createProblemAction.fulfilled, () => {
        notification.success({
          message: "Tạo bài thành công!",
        });
      })
      .addCase(createProblemAction.rejected, () => {
        notification.error({
          message: "Lỗi khi tạo bài!",
        });
      });
    builder
      .addCase(editProblemAction.fulfilled, () => {
        notification.success({
          message: "Sửa bài thành công!",
        });
      })
      .addCase(editProblemAction.rejected, () => {
        notification.error({
          message: "Lỗi khi sửa bài!",
        });
      });
    builder
      .addCase(submitProblemAction.fulfilled, () => {
        notification.success({
          message: "Đã nộp!",
        });
      })
      .addCase(submitProblemAction.rejected, () => {
        notification.error({
          message: "Submit problems fail!",
        });
      });
    builder
      .addCase(getProblemStatisticAction.fulfilled, (state, action) => {
        state.statistic = action.payload;
      })
      .addCase(getProblemStatisticAction.rejected, () => {
        notification.error({
          message: "Get statistic fail!",
        });
      });
    builder
      .addCase(getProblemStatisticDetailAction.fulfilled, (state, action) => {
        state.statisticDetail = action.payload[0];
      })
      .addCase(getProblemStatisticDetailAction.rejected, () => {
        notification.error({
          message: "Get details fail!",
        });
      });
    builder
      .addCase(getAllProblemAdminAction.fulfilled, (state, action) => {
        state.problemsAdmin = action.payload;
      })
      .addCase(getAllProblemAdminAction.rejected, () => {
        notification.error({
          message: "Get all problems fail!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.contestSlice;

export const contestStateSelector = createSelector(
  selectSelf,
  (state) => state
);
export const allProblemsSelector = createSelector(
  selectSelf,
  (state) => state.problems
);
export const allProblemsAdminSelector = createSelector(
  selectSelf,
  (state) => state.problemsAdmin
);
export const oneProblemsSelector = createSelector(
  selectSelf,
  (state) => state.problem
);
export const oneProblemAdminSelector = createSelector(
  selectSelf,
  (state) => state.problemAdmin
);
export const statisticSelector = createSelector(
  selectSelf,
  (state) => state.statistic
);
export const statisticDetailSelector = createSelector(
  selectSelf,
  (state) => state.statisticDetail
);

export default contestSlice.reducer;
