import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import jwt from './jwt';

const rootReducer = combineReducers({
  auth,
  form,
  jwt
});

export default rootReducer;
