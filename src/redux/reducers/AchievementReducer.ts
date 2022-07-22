import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { IAchievementState } from "../interface/AchievementType";
import {
  createRankAction,
  deleteRankAction,
  editRankAction,
  getAllRankAction,
  getOneRankAction,
} from "../actions/AchievementAction";

const initialState: IAchievementState = {
  ranks: [],
  rank: {
    about: "",
    id: 0,
    created_at: "",
    updated_at: "",
    rank: "",
    score: 0,
    colorcode: "",
    max_score: 0,
    min_score: 0,
  },
};

export const achievementSlice = createSlice({
  name: "achievementReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRankAction.fulfilled, (state, action) => {
        state.ranks = action.payload;
      })
      .addCase(getAllRankAction.rejected, () => {
        notification.error({
          message: "Get all ranks fail!",
        });
      });
    builder
      .addCase(getOneRankAction.fulfilled, (state, action) => {
        state.rank = action.payload;
      })
      .addCase(getOneRankAction.rejected, () => {
        notification.error({
          message: "Get rank info fail!",
        });
      });
    builder
      .addCase(deleteRankAction.fulfilled, () => {
        notification.success({
          message: "Đã xóa hạng!",
        });
      })
      .addCase(deleteRankAction.rejected, () => {
        notification.error({
          message: "Lỗi khi xóa!",
        });
      });
    builder
      .addCase(createRankAction.fulfilled, () => {
        notification.success({
          message: "Đã thêm hạng mới!",
        });
      })
      .addCase(createRankAction.rejected, () => {
        notification.error({
          message: "Lỗi khi thêm hạng!",
        });
      });
    builder
      .addCase(editRankAction.fulfilled, () => {
        notification.success({
          message: "Đã sửa hạng!",
        });
      })
      .addCase(editRankAction.rejected, () => {
        notification.error({
          message: "Lỗi khi sửa hạng!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.achievementSlice;

export const achievementStateSelector = createSelector(
  selectSelf,
  (state) => state
);
export const allRankSelector = createSelector(
  selectSelf,
  (state) => state.ranks
);
export const oneRankSelector = createSelector(
  selectSelf,
  (state) => state.rank
);

export default achievementSlice.reducer;
