import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { createTagAction, getAllTagAction } from "../actions/TagAction";

const initialState = {
  tags: [
    {
        id: 0,
        content: "____",
        colorcode: "#F5F9F9",
        created_at: "",
        updated_at: '',
        postusetag: 0
    },
  ],
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
          message: "Create Tag Success!",
        });
      })
      .addCase(createTagAction.rejected, () => {
        notification.error({
          message: "Create tag fail!",
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
