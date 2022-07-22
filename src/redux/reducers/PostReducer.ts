import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { notification } from "antd";

import {
  approvePostAction,
  createPostAction,
  deleteCommentAction,
  deletePostAction,
  editCommentAction,
  editPostAction,
  getAllCommentAction,
  getAllPostAction,
  getMostVotedPostAction,
  getOnePostAction,
  searchPostAction,
  searchPostByTagAction,
  unapprovePostAction,
} from "../actions/PostAction";
import { IPostState } from "../interface/PostType";

const initialState: IPostState = {
  posts: [],
  mostVotedPosts: [],
  searchedPosts: [],
  singlePost: [
    {
      avatarImage: "",
      post_code: "",
      post_created_at: "",
      post_language: "",
      post_title: "",
      post_updated_at: "",
      postcomment: [
        {
          avatarImage: "",
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
  comments: [],
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
          message: "Đã tạo bài viết! Xin hãy chờ duyệt",
          duration: 4
        });
      })
      .addCase(createPostAction.rejected, () => {
        notification.error({
          message: "Create post fail!",
        });
      });
    builder
      .addCase(editPostAction.fulfilled, () => {
        notification.success({
          message: "Sửa bài viết thành công!",
        });
      })
      .addCase(editPostAction.rejected, () => {
        notification.error({
          message: "Lỗi khi sửa bài viết!",
        });
      });
    builder
      .addCase(deletePostAction.fulfilled, () => {
        notification.success({
          message: "Xóa bài viết thành công!",
        });
      })
      .addCase(deletePostAction.rejected, () => {
        notification.error({
          message: "Lỗi khi xóa bài viết!",
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
    builder
      .addCase(approvePostAction.fulfilled, () => {
        notification.success({
          message: "Đã duyệt bài viết!",
        });
      })
      .addCase(approvePostAction.rejected, () => {
        notification.error({
          message: "Lỗi khi duyệt!",
        });
      });
    builder
      .addCase(unapprovePostAction.fulfilled, () => {
        notification.success({
          message: "Bỏ duyệt thành công!",
        });
      })
      .addCase(unapprovePostAction.rejected, () => {
        notification.error({
          message: "Lỗi khi bỏ duyệt!",
        });
      });
    builder
      .addCase(getAllCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getAllCommentAction.rejected, () => {
        notification.error({
          message: "Get all comment fail!",
        });
      });
    builder
      .addCase(editCommentAction.fulfilled, () => {
        notification.success({
          message: "Sửa bình luận thành công!",
        });
      })
      .addCase(editCommentAction.rejected, () => {
        notification.error({
          message: "Lỗi khi sửa!",
        });
      });
    builder
      .addCase(deleteCommentAction.fulfilled, () => {
        notification.success({
          message: "Đã xóa bình luận!",
        });
      })
      .addCase(deleteCommentAction.rejected, () => {
        notification.error({
          message: "Lỗi khi xóa bình luận!",
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
export const allCommentSelector = createSelector(
  selectSelf,
  (state) => state.comments
);

export default postSlice.reducer;
