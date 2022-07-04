import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { createTagAction, getAllTagAction } from "../actions/TagAction";
import { ITagState } from "../interface/TagType";

const initialState: ITagState = {
  tags: [],
};

export const tagSlice = createSlice({
  name: "tagReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTagAction.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(getAllTagAction.rejected, () => {
        notification.error({
          message: "Get all tag fail!",
        });
      });
    builder
      .addCase(createTagAction.fulfilled, () => {
        notification.success({
          message: "Tạo thẻ thành công!",
        });
      })
      .addCase(createTagAction.rejected, () => {
        notification.error({
          message: "Lỗi khi tạo thẻ!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.tagSlice;

export const tagStateSelector = createSelector(selectSelf, (state) => state);
export const allTagSelector = createSelector(
  selectSelf,
  (state) => state.tags
);

export default tagSlice.reducer;
