import axios from 'axios';
import { LIKE_BLOG, FETCH_BLOGS, FETCH_BLOG, Blog } from "./types";

export function fetchBlogs() {
  const promise = getBlogs();

  return {
    type: FETCH_BLOGS,
    payload: promise
  };
}

export function fetchBlog(id: string = '') {
  const promise = getBlogs(id);

  return {
    type: FETCH_BLOG,
    payload: promise
  };
}

export function getBlogs(id: string = '') {
  return axios.get<Blog[]>(`https://jsonplaceholder.typicode.com/posts/${id}`);
}

export function likeBlog(blogId: string) {
  return {
    type: LIKE_BLOG,
    blogId: blogId
  };
}