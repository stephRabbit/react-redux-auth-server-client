import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import App from './components/App';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import RequireAuth from './components/auth/RequireAuth';
import Feature from './components/containers/Feature';
import Welcome from './components/Welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Updating application before it has been rendered
const token = localStorage.getItem('token');

// If token exist user is considered signed in
if (token) {
  // update application state using dispatch method from store
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Route path="/feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
