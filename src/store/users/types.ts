export interface User {
  id: number;
  name: string;
  company?: Company;
}

// TODO: abstract out type using generics and put it somewhere
// or find pre-existing type definition for dictionary..
export interface NormalizedUsers {
  [key: number]: User
}

interface Company {
  name: string;
}

export const FETCH_USER = 'FETCH_USER';

export interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: payLoad
}

export interface payLoad {
  data: User
}

export type ActionTypes = FetchUserAction;