import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from '../actions/types';

const auth = (state = {}, action) => {
  switch(action.type) {
    case AUTH_USER:
      // When user successfully signin/signup
      // clear error: '' and authenticated: true
      return {
        ...state,
        error: '',
        authenticated: true
      }
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default auth;