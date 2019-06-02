import { User } from '../users/types';

export interface Blog {
  userId: number;
  id: number;
  title: string;
  body: string;
  isLiked: boolean;
}

export interface BlogWithUser extends Blog {
  user: User | null;
}

export interface NormalizedBlogsWithUsers {
  [key: number]: BlogWithUser
}

export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOG = 'FETCH_BLOG';
export const LIKE_BLOG = 'LIKE_BLOG';

export interface FetchBlogAction {
  type: typeof FETCH_BLOG;
  payload: payLoad
}

export interface FetchBlogsAction {
  type: typeof FETCH_BLOGS;
  payload: payLoadArray
}

export interface LikeBlogAction {
  type: typeof LIKE_BLOG;
  blogId: number
}

export interface NormalizedBlogs {
  [key: number]: Blog
}

// TODO: look into typing these better
interface payLoad {
  data: Blog
}

interface payLoadArray {
  data: Blog[]
}


export type ActionTypes = FetchBlogsAction | FetchBlogAction | LikeBlogAction;