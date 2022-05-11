import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";
import { IHomePost } from "../interface/PostType";
import { getAllPostAction } from "../actions/PostAction";

const initialState = {
  posts: [
    {
      postinfo: [
        {
          userid: 0,
          username: "",
          postid: 0,
          title: "",
          created_at: "",
          updated_at: "",
          votenumber: 0,
        },
      ],
      posttag: [{ posttag: "" }],
      numberofcomment: 0,
    },
  ],
};

export const postSlice = createSlice({
  name: "getAllPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostAction.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(getAllPostAction.rejected, () => {
        notification.error({
          message: "Get all post fail!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.postSlice;

export const postStateSelector = createSelector(selectSelf, (state) => state);
export const allPostSelector = createSelector(selectSelf, (state) => state.posts);

export default postSlice.reducer;
