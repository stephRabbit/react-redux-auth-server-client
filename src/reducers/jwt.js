import { FETCH_MESSAGE } from '../actions/types';

const jwt = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MESSAGE:
      console.log(action.payload);
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}

export default jwt;