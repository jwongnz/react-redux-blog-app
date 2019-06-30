import axios from 'axios';
import { LIKE_BLOG, FETCH_BLOGS, FETCH_BLOG, Blog } from "./types";
import { Dispatch } from 'redux';

export const fetchBlogs = () => async (dispatch: Dispatch) => {
  const response = await axios.get<Blog[]>('https://jsonplaceholder.typicode.com/posts');

  dispatch({ type: FETCH_BLOGS, payload: response });
};

export const fetchBlog = (id: string = '') => async (dispatch: Dispatch) => {
  const response = await axios.get<Blog[]>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  dispatch({ type: FETCH_BLOG, payload: response });
};

export function likeBlog(blogId: string) {
  return {
    type: LIKE_BLOG,
    blogId: blogId
  };
}