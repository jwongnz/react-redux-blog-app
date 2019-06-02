import { ActionTypes, FETCH_USER, NormalizedUsers } from './types';

const initialState: NormalizedUsers = {
};

export default function(state = initialState, action: ActionTypes): NormalizedUsers {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      };
    default:
      return state;
  }
}