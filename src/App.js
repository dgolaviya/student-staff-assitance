import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import Register from './components/Register';
import Login from './components/Login';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/actions";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";

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

const selectDashboard = () => {
  const { user } = store.getState().auth;
  let renderComponent = StudentDashboard;
  if (user.roleId === '1') {
    renderComponent = AdminDashboard;
  } else if (user.roleId === '2') {
    renderComponent = StaffDashboard;
  }
  return renderComponent;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute path="/dashboard" component={selectDashboard()} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
