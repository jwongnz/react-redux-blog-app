import { ActionTypes, LIKE_BLOG, FETCH_BLOGS, FETCH_BLOG, NormalizedBlogs } from './types';

const initialState: NormalizedBlogs = {
};

export default function(state = initialState, action: ActionTypes): NormalizedBlogs {
  switch(action.type) {
    case FETCH_BLOGS:
      if (!action.payload.data)
        // handle error
        return state;

      const normalizedPayload : NormalizedBlogs = {};
      action.payload.data.forEach(blog => normalizedPayload[blog.id] = blog);

      return {
        ...normalizedPayload,
        ...state
      };
    case FETCH_BLOG:
      if (!(action.payload.data && action.payload.data.id))
        // handle error
        return state;

      return {
        [action.payload.data.id]: action.payload.data,
        ...state,
      };
    case LIKE_BLOG:
      const likedBlog = Object.assign({}, state[action.blogId]);
      likedBlog.isLiked = !likedBlog.isLiked;

      return {
        ...state,
        [action.blogId]: likedBlog
      };
    default:
      return state;
  }
}