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

export type IHomePost = {
  userid: number;
  username: string;
  postid: number;
  title: string;
  votenumber: number;
  commentnumber: number;
  posttag: IHomeTag[];
  created_at: string;
};

export type IPostInfo = {
  userid: number;
  username: string;
  postid: number;
  title: string;
  created_at: string;
  updated_at: string;
  votenumber: number;
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
}
