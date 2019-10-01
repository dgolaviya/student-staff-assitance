import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User


export const registerUser = (userData, history) => {
  const url = `/api/users`;
  const payload = {
    action: 'REGISTER_USER',
    method: 'POST',
    // apiConfig: {
    //   headers: {
    //     Accept: 'application/json'
    //   }
    // },
    url,
    data: userData

  };
  return { type: 'API_INVOCATION', payload };
};

export const loginUser = (userData) => {
  const url = `/api/users/login?userNameOrEmailId=${userData.userNameOrEmailId}&password=${userData.password}`;
  const payload = {
    action: 'LOGIN_USER',
    method: 'GET',
    url
  };
  return { type: 'API_INVOCATION', payload };
};


// Login - get user token
// export const loginUser = userData => dispatch => {
//   axios
//     .get(`/login?userNameOrEmailId=${userData.userNameOrEmailId}&password=${userData.password}`)
//     .then(res => {
//       // Save to localStorage
// // Set token to localStorage
//       // const { token } = res.data;
//       // localStorage.setItem("jwtToken", token);
//       // // Set token to Auth header
//       // setAuthToken(token);
//       // // Decode token to get user data
//       // const decoded = jwt_decode(token);
//       // // Set current user
//       // dispatch(setCurrentUser(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem("user");
  // dispatch(setCurrentUser({}));
};

export const fetchUserRoles = () => {
  const url = `/api/roles`;
  const payload = {
    action: 'FETCH_USER_ROLES',
    method: 'GET',
    url
  };
  return { type: 'API_INVOCATION', payload };
};

export const fetchDepartments = () => {
  const url = `/api/departments`;
  const payload = {
    action: 'FETCH_DEPARTMENTS',
    method: 'GET',
    url
  };
  return { type: 'API_INVOCATION', payload };
};

export const fetchProgramsbyDept = (deptId) => {
  const url = `/api/departments/${deptId}/programs `;
  const payload = {
    action: 'FETCH_PROGRAMS',
    method: 'GET',
    url
  };
  return { type: 'API_INVOCATION', payload };
};