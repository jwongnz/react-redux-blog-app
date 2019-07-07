import axios from 'axios';
import { FETCH_USER, User } from "./types";
import { Dispatch } from 'redux';

export const fetchUser = (id: string | number) => async (dispatch: Dispatch) => {
  const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);

  dispatch({ type: FETCH_USER, payload: response });
};