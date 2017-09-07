import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from './constants';
import {
  AUTH_ERROR,
  AUTH_USER,
  FETCH_MESSAGE,
  UNAUTH_USER
} from './types';

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const signinUser = ({ email, password }) => {
  // Dispatch are own action at anytime
  // Called by thunk middleware with the dispatch method
  return dispatch => {
    // Submit email and password to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If request is good need to update state
        // to reflect user is authenicated - true
        dispatch({ type: AUTH_USER });
        // Save JWT token
        localStorage.setItem('token', response.data.token);
        // Redirect to /feature page or any other page chosen
        browserHistory.push('/feature');
      })
      .catch(error => {
        // If request is bad show error message
        // to user
        dispatch(authError('Incorrect login credentials.'));
      });
  }
}

export const signupUser = ({ email, password }) => {
  return dispatch => {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        // If request is good need to update state
        // to reflect user is authenicated - true
        dispatch({ type: AUTH_USER });
        // Save JWT token
        localStorage.setItem('token', response.data.token);
        // Redirect to /feature page or any other page chosen
        browserHistory.push('/feature');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export const signoutUser = () => {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
};


export const fetchMessage = () => {
  return dispatch => {
    axios.get(API_URL, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    });
  };
}