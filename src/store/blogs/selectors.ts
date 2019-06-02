import { createSelector } from 'reselect';
import { AppState } from '../index';
import { NormalizedBlogs, NormalizedBlogsWithUsers } from './types';
import { NormalizedUsers } from '../users/types';
import map from 'lodash/map';
import filter from 'lodash/filter';

const blogsSelector = (state: AppState) => state.blogs
const usersSelector = (state: AppState) => state.users


const getBlogsWithUsers = (blogs: NormalizedBlogs, users: NormalizedUsers): NormalizedBlogsWithUsers => {
  let normalizedBlogsWithUsers: NormalizedBlogsWithUsers = {};

  map(blogs,
    blog => {
      const user = filter(users, (user) => {
        return user.id === blog.userId;
      })[0];
      normalizedBlogsWithUsers[blog.id] = {...blog, user }
    }
  );

  return normalizedBlogsWithUsers;
};

export default createSelector(
  blogsSelector,
  usersSelector,
  getBlogsWithUsers
);