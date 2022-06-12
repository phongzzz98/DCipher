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
  linkSNS: ISocial[];
  notification: number;
  score: number;
  user_follow: IUserFollow[];
  user_following: IUserFollow[];
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

export interface ISocial {
  facebook_account: string;
  linkedin_account: string;
  twitter_account: string;
}

export interface IUserFollow {
  userid: number;
  displayname: string;
  avatarImage: string;
  score: number
}