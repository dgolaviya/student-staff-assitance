import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/actions";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashboardRoute from './components/DashboardRoute';

import './App.scss';

// Check for token to keep user logged in
if (!localStorage.getItem('user')) {
  // Logout user
  // store.dispatch(logoutUser());
  store.dispatch(setCurrentUser(JSON.stringify({})))
  // Redirect to login
  // window.location.href = "./login";
}
else {
  store.dispatch(setCurrentUser(localStorage.getItem('user')))
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Switch>
            <PrivateRoute path="/dashboard" component={DashboardRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
