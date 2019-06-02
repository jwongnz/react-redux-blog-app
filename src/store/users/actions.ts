import axios from 'axios';
import { FETCH_USER, User } from "./types";

export function fetchUser(id: number) {
  const promise = axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);

  return {
    type: FETCH_USER,
    payload: promise
  };
}
