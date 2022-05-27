import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";

import {
  createPostAction,
  getAllPostAction,
  getOnePostAction,
} from "../actions/PostAction";

const initialState = {
  posts: [
    {
      userid: 0,
      username: "",
      postid: 0,
      title: "",
      votenumber: 0,
      commentnumber: 0,
      posttag: [
        {
          tagid: 0,
          tagcontent: "",
          colorcode: "",
        },
      ],
      created_at: "",
    },
  ],
  singlePost: {
    postuser: [
      {
        postusername: "",
        postid: 0,
        postcontent: "",
        post_title: "",
        post_code: "",
        created_at: "",
        updated_at: "",
        votenumber: 0,
      },
    ],
    postcomment: [
      {
        commentcontent: "",
        commentuserid: 0,
        commentusername: "",
        commentvotenumber: 0,
        created_at: "",
        updated_at: "",
      },
    ],
    posttag: [
      {
        tagcontent: "____",
        tagid: 0,
        tagcolor: "#F3F3F3",
      },
    ],
  },
};

export const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostAction.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAllPostAction.rejected, () => {
        notification.error({
          message: "Get all post fail!",
        });
      });
    builder
      .addCase(createPostAction.fulfilled, () => {
        notification.success({
          message: "Create Post Success!",
        });
      })
      .addCase(createPostAction.rejected, () => {
        notification.error({
          message: "Create post fail!",
        });
      });
    builder
      .addCase(getOnePostAction.fulfilled, (state, action) => {
        state.singlePost = action.payload;
      })
      .addCase(getOnePostAction.rejected, () => {
        notification.error({
          message: "Get post fail!",
        });
      });
  },
});

const selectSelf = (state: RootState) => state.postSlice;

export const postStateSelector = createSelector(selectSelf, (state) => state);
export const allPostSelector = createSelector(
  selectSelf,
  (state) => state.posts
);
export const onePostSelector = createSelector(
  selectSelf,
  (state) => state.singlePost
);

export default postSlice.reducer;
