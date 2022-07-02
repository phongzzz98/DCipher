import { IHomeTag } from "./PostType";

export interface IUserState {
  users: IUser[];
  oneUserInfo: IOneUserInfo;
  notification: INotification[];
  userDetail: IUserDetails;
  userPosts: IUserPost[];
  userComments: IUserComment[];
  userBookmarks: IUserBookmark[];
}

export interface IUser {
  userid: number;
  avatarImage: string;
  displayname: string;
  score: number;
  number_of_followers: number;
  number_of_post: number;
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
  created_at: string;
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
  score: number;
}

export interface IUserBookmark {
  postid: number;
  title: string;
  votenumber: number;
  commentnumber: number;
  viewnumber: number;
  created_at: string;
  updated_at: string;
}

export interface IUserDetailsToSave {
  avatarImage: string;
  userid: number;
  displayname: string;
  about: string;
  fullname: string;
  birth: string;
  linkSNS: string[];
}

export interface IFollowData {
  user_id: number;
  user_follow_id: number;
}

export interface IOneUserInfo {
  userid: number;
  displayname: string;
  about: string;
  created_at: string;
  avatarImage: string;
  linkSNS: ISocial[];
  score: number;
  number_of_post: number;
  number_of_comment: number;
  post_created: IUserPost[];
  user_follow: IUserFollow[];
  number_of_followers: number;
}
