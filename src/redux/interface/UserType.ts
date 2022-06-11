import { IHomeTag } from "./PostType";

export interface IUserState {
  notification: INotification[];
  userDetail: IUserDetails;
  userPosts: IUserPost[];
  userComments: IUserComment[];
}

export interface INotification {
  content: string;
  created_at: string;
  postid: number;
  title: string;
  username: string;
}

export interface IUserDetails {
  about: string;
  avatarImage: string;
  birth: string;
  displayname: string;
  fullName: string;
  linkSNS: string;
  notification: number;
  score: number;
  user_follow: number[];
  userid: number;
}

export interface IUserPost {
  commentnumber: number;
  created_at: string;
  postid: number;
  posttag: IHomeTag[];
  title: string;
  viewnumber: number;
  votenumber: number;
}

export interface IUserComment {
  content: string;
  created_at: string;
  id: number;
  postid: number;
  updated_at: string;
  userid: number;
  votenumber: number;
}
