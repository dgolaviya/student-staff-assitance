import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LOGOUT_USER,
  RESET_AUTH_ERROR
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

export const createCourse = (course, deptId, progId) => {
  const url = `/api/departments/${deptId}/programs/${progId}/courses`;
  const payload = {
    action: 'CREATE_COURSE',
    method: 'POST',
    url,
    data: course
  };
  return { type: 'API_INVOCATION', payload };
};

export const deleteCourse = (courseId) => {
  const url = `/api/courses/${courseId}`;
  const payload = {
    action: 'DELETE_COURSE',
    method: 'DELETE',
    url
  };
  return { type: 'API_INVOCATION', payload, courseId };
};

export const getCourses = () => {
  const url = `/api/courses`;
  const payload = {
    action: 'FETCH_COURSES',
    method: 'GET',
    url
  };
  return { type: 'API_INVOCATION', payload };
};

export const fetchEnrolledCourses = (userId) => {
  const url = `/api/users/${userId}/enrollCourses`;
  const payload = {
    action: 'FETCH_ENROLLED_COURSES',
    method: 'GET',
    url
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
  return { type: LOGOUT_USER };;
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
export const resetAuthError = () => ({ type: RESET_AUTH_ERROR })