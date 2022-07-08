import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import {
  createTagAction,
  deleteTagAction,
  editTagAction,
  getAllTagAction,
  getOneTagAction,
} from "../actions/TagAction";
import { ITagState } from "../interface/TagType";

const initialState: ITagState = {
  tags: [],
  selectedTag: {
    taginfo: {
      id: 0,
      userid: 0,
      content: "",
      colorcode: "",
      description: "",
      icon_class: "",
      status: 1,
      created_at: "",
      updated_at: "",
    },
    postusetag: 0,
  },
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
    builder
      .addCase(deleteTagAction.fulfilled, () => {
        notification.success({
          message: "Xóa thẻ thành công!",
        });
      })
      .addCase(deleteTagAction.rejected, () => {
        notification.error({
          message: "Lỗi khi xóa thẻ!",
        });
      });
    builder
      .addCase(getOneTagAction.fulfilled, (state, action) => {
        state.selectedTag = action.payload;
      })
      .addCase(getOneTagAction.rejected, () => {
        notification.error({
          message: "Get one tag fail!",
        });
      });
    builder
      .addCase(editTagAction.fulfilled, (state, action) => {
        notification.success({
          message: "Sửa thẻ thành công!",
        });
      })
      .addCase(editTagAction.rejected, () => {
        notification.error({
          message: "Lỗi khi sửa thẻ!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.tagSlice;

export const tagStateSelector = createSelector(selectSelf, (state) => state);
export const allTagSelector = createSelector(selectSelf, (state) => state.tags);
export const oneTagSelector = createSelector(
  selectSelf,
  (state) => state.selectedTag.taginfo
);

export default tagSlice.reducer;
