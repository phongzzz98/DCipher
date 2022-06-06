export type IAllPostWithPagination = {
  current_page: number;
  data: IHomePost[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  //   links: [
  //     {
  //       url: null,
  //       label: &laquo; Previous,
  //       active: false
  //     },
  //     {
  //       url: http://code-ide-forum.herokuapp.com/api/post?page=1,
  //       label: 1,
  //       active: true
  //     },
  //     {
  //       url: http://code-ide-forum.herokuapp.com/api/post?page=2,
  //       label: 2,
  //       active: false
  //     },
  //     {
  //       url: http://code-ide-forum.herokuapp.com/api/post?page=2,
  //       label: Next &raquo;,
  //       active: false
  //     }
  //   ],
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export interface IPostState {
  posts: IHomePost[];
  mostVotedPosts: IHomePost[];
  searchedPosts: IHomePost[];
  singlePost: IPost[];
}

export type IHomePost = {
  userid: number;
  username: string;
  postid: number;
  title: string;
  created_at: string;
  updated_at: string;
  votenumber: number;
  commentnumber: number;
  content: string;
  posttag: IHomeTag[];
  viewnumber: number;
};

export type IHomeTag = {
  tagid: number;
  tagcontent: string;
  colorcode: string;
};

export interface ICreatePost {
  title: string;
  content: string;
  code: string;
  tagid: number[];
  userid: number;
  language: string;
}

export interface IPost {
  post_code: string | null;
  post_created_at: string;
  post_language: string | null;
  post_title: string;
  post_updated_at: string;
  postcomment: IComment[];
  postcontent: string;
  postid: number;
  posttag: IPostTag[];
  postusername: string;
  user_set_bookmark: number[];
  user_vote_post: number[];
  viewnumber: number;
  votenumber: number;
}

export interface IComment {
  commentid: number;
  commentcontent: string;
  commentuserid: number;
  commentusername: string;
  commentvotenumber: number;
  user_vote_comment: number[];
  created_at: string;
  updated_at: string;
}

export interface IPostUser {
  postusername: string;
  postid: number;
  postcontent: string;
  post_title: string;
  post_code: string;
  created_at: string;
  updated_at: string;
  votenumber: number;
  viewnumber: number;
}

export interface IPostTag {
  tagcolor: string;
  tagcontent: string;
  tagid: number;
}
