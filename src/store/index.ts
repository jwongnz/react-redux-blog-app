import { combineReducers } from 'redux';
import BlogsReducer from './blogs/reducers';
import UsersReducer from './users/reducers';

const rootReducer = combineReducers({
  blogs: BlogsReducer,
  users: UsersReducer
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;