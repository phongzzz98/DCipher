import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";

import {
  createPostAction,
  getAllPostAction,
  getMostVotedPostAction,
  getOnePostAction,
  searchPostAction,
  searchPostByTagAction,
} from "../actions/PostAction";
import { IPostState } from "../interface/PostType";

const initialState: IPostState = {
  posts: [],
  mostVotedPosts: [],
  searchedPosts: [],
  singlePost: [
    {
      post_code: "",
      post_created_at: "",
      post_language: "",
      post_title: "",
      post_updated_at: "",
      postcomment: [
        {
          commentid: 0,
          commentcontent: "",
          commentuserid: 0,
          commentusername: "",
          commentvotenumber: 0,
          user_vote_comment: [],
          created_at: "",
          updated_at: "",
        },
      ],
      postcontent: "",
      postid: 0,
      posttag: [
        {
          tagcontent: "____",
          tagid: 0,
          tagcolor: "#F3F3F3",
        },
      ],
      postusername: "",
      user_follow_creator: [],
      user_set_bookmark: [],
      user_vote_post: [],
      userid: 0,
      viewnumber: 0,
      votenumber: 0,
    },
  ],
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
    builder
      .addCase(getMostVotedPostAction.fulfilled, (state, action) => {
        state.mostVotedPosts = action.payload;
      })
      .addCase(getMostVotedPostAction.rejected, () => {
        notification.error({
          message: "Get most voted post fail!",
        });
      });
    builder
      .addCase(searchPostAction.fulfilled, (state, action) => {
        state.searchedPosts = action.payload;
      })
      .addCase(searchPostAction.rejected, () => {
        notification.error({
          message: "Search fail!",
        });
      });
    builder
      .addCase(searchPostByTagAction.fulfilled, (state, action) => {
        state.searchedPosts = action.payload;
      })
      .addCase(searchPostByTagAction.rejected, () => {
        notification.error({
          message: "Search fail!",
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
export const mostVotedPostsSelector = createSelector(
  selectSelf,
  (state) => state.mostVotedPosts
);
export const searchedPostsSelector = createSelector(
  selectSelf,
  (state) => state.searchedPosts
);

export default postSlice.reducer;
