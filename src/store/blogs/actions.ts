import axios from 'axios';
import { fetchUser } from '../users/actions';
import { LIKE_BLOG, FETCH_BLOGS, FETCH_BLOG, Blog } from './types';
import { Dispatch } from 'redux';

export const fetchBlogs = () => async (dispatch: Dispatch) => {
  const response = await axios.get<Blog[]>('https://jsonplaceholder.typicode.com/posts');

  dispatch({ type: FETCH_BLOGS, payload: response });
};

export const fetchBlog = (id: string | number = '') => async (dispatch: Dispatch) => {
  const response = await axios.get<Blog>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  await dispatch({ type: FETCH_BLOG, payload: response });

  fetchUser(response.data.userId)(dispatch);
};

export function likeBlog(id: string | number) {
  return {
    type: LIKE_BLOG,
    blogId: id
  };
}