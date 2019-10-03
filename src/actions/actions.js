import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LOGOUT_USER,
  RESET_AUTH_ERROR,
  UPDATE_USER,
  UPLOAD_AVATAR,
  CHANGE_PASSWORD,
  FETCH_AVATAR_IMAGE
} from "./types";

// Register User

export const registerUser = (userData, history) => {
  const url = `/api/users`;
  const payload = {
    action: "REGISTER_USER",
    method: "POST",
    url,
    data: userData
  };
  return { type: "API_INVOCATION", payload };
};

export const resetPassword = emailId => {
  const url = `/api/emailId/${emailId}/forgetPassword`;
  const payload = {
    action: "RESET_PASSWORD",
    method: "PUT",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const createCourse = (course, deptId, progId) => {
  const url = `/api/departments/${deptId}/programs/${progId}/courses`;
  const payload = {
    action: "CREATE_COURSE",
    method: "POST",
    url,
    data: course
  };
  return { type: "API_INVOCATION", payload };
};

export const updateUser = (userId, userData) => {
  const url = `/api/users/${userId}`;
  const payload = {
    action: UPDATE_USER,
    method: "PUT",
    url,
    data: userData
  };
  return { type: "API_INVOCATION", payload };
};

export const deleteUser = userId => {
  const url = `/api/users/${userId}`;
  const payload = {
    action: "DELETE_USER",
    method: "DELETE",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const uploadAvatar = (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `/api/users/${userId}/avatar-img`;
  const payload = {
    action: UPLOAD_AVATAR,
    method: "POST",
    url,
    apiConfig: {
      headers: {
        "content-type": "multipart/form-data"
      }
    },
    data: formData
  };
  return { type: "API_INVOCATION", payload };
};

export const changePassword = (userId, newPassword) => {
  const url = `/api/users/${userId}/changePassword?newPassword=${newPassword}`;
  const payload = {
    action: CHANGE_PASSWORD,
    method: "PUT",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const fetchAvatarImage = userId => {
  const url = `/api/users/${userId}/avatar-img`;
  const payload = {
    action: FETCH_AVATAR_IMAGE,
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const deleteCourse = courseId => {
  const url = `/api/courses/${courseId}`;
  const payload = {
    action: "DELETE_COURSE",
    method: "DELETE",
    url
  };
  return { type: "API_INVOCATION", payload, courseId };
};

export const getCourses = () => {
  const url = `/api/courses`;
  const payload = {
    action: "FETCH_COURSES",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const fetchEnrolledCourses = userId => {
  const url = `/api/users/${userId}/enrollCourses`;
  const payload = {
    action: "FETCH_ENROLLED_COURSES",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const getAvailableCourses = (deptId, progId) => {
  const url = `/api/departments/${deptId}/programs/${progId}/courses`;

  const payload = {
    action: "FETCH_AVAILABLE_COURSES",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const getToApproveCourses = () => {
  const url = `/api/enrollCourses?approved=false`;
  const payload = {
    action: "GET_TO_APPROVE_COURSES",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const enrollCourse = (userId, courseIds) => {
  const url = `/api/users/${userId}/enrollCourses`;
  const payload = {
    action: "ENROLL_COURSE",
    method: "POST",
    url,
    data: [courseIds]
  };
  return { type: "API_INVOCATION", payload };
};

export const approveEnrollment = (adminId, courseId, enrolledUserId) => {
  const url = `/api/users/${adminId}/approveCourse`;
  const payload = {
    action: "APPROVE_ENROLLMENT",
    method: "POST",
    url,
    data: {
      userId: enrolledUserId,
      courseId
    }
  };
  return { type: "API_INVOCATION", payload };
};
export const rejectEnrollment = (adminId, courseId, enrolledUserId) => {
  const url = `/api/enrolledCourse`;
  const payload = {
    action: "REJECT_ENROLLMENT",
    method: "DELETE",
    url,
    data: {
      userId: enrolledUserId,
      courseId
    }
  };
  return { type: "API_INVOCATION", payload };
};

export const getAllUsers = () => {
  const url = `/api/users`;
  const payload = {
    action: "GET_ALL_USERS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const loginUser = userData => {
  const url = `/api/users/login?userNameOrEmailId=${userData.userNameOrEmailId}&password=${userData.password}`;
  const payload = {
    action: "LOGIN_USER",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
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
  return { type: LOGOUT_USER };
  // dispatch(setCurrentUser({}));
};

export const fetchUserRoles = () => {
  const url = `/api/roles`;
  const payload = {
    action: "FETCH_USER_ROLES",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const fetchDepartments = () => {
  const url = `/api/departments`;
  const payload = {
    action: "FETCH_DEPARTMENTS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const fetchPrograms = () => {
  const url = `/api/programs`;
  const payload = {
    action: "FETCH_ALL_PROGRAMS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const fetchProgramsbyDept = deptId => {
  const url = `/api/departments/${deptId}/programs `;
  const payload = {
    action: "FETCH_PROGRAMS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};
export const resetAuthError = () => ({ type: RESET_AUTH_ERROR });

export const fetchDiscussionThreads = () => {
  const url = `/api/discussionThreads`;
  const payload = {
    action: "FETCH_DISCUSSION_THREADS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const createDiscussionThread = (data, userId) => {
  const url = `/api/users/${userId}/discussionThreads`;
  const payload = {
    action: "CREATE_DISCUSSION_THREAD",
    method: "POST",
    url,
    data: data
  };
  return { type: "API_INVOCATION", payload };
};

export const updateDiscussionThread = (data, userId) => {
  console.log(data + userId);
  const url = `/api/users/${userId}/discussionThreads/${data.discussionThreadId}`;
  const payload = {
    action: "UPDATE_DISCUSSION_THREAD",
    method: "PUT",
    url,
    data: data
  };
  return { type: "API_INVOCATION", payload };
};

export const setDiscussionThreadEditId = discussionThreadId => {
  return { type: "SET_DISCUSSION_THREAD_EDIT_ID", payload: discussionThreadId };
};

export const fetchDiscussionChats = discussionThreadId => {
  const url = `/api/discussionThreads/${discussionThreadId}/discussionChats`;
  const payload = {
    action: "FETCH_DISCUSSION_CHATS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const createDiscussionChat = (data, userId, discussionThreadId) => {
  const url = `/api/users/${userId}/discussionThreads/${discussionThreadId}/discussionChats`;
  const payload = {
    action: "CREATE_DISCUSSION_CHAT",
    method: "POST",
    url,
    data: data
  };
  return { type: "API_INVOCATION", payload };
};

export const fetchEvents = () => {
  const url = `/api/events`;
  const payload = {
    action: "FETCH_EVENTS",
    method: "GET",
    url
  };
  return { type: "API_INVOCATION", payload };
};

export const createEvent = (data, userId) => {
  const url = `/api/users/${userId}/events`;
  const payload = {
    action: "CREATE_EVENT",
    method: "POST",
    url,
    data: data
  };
  return { type: "API_INVOCATION", payload };
};

export const updateEvent = (data, userId) => {
  const url = `/api/users/${userId}/events/${data.eventId}`;
  const payload = {
    action: "UPDATE_EVENT",
    method: "PUT",
    url,
    data: data
  };
  return { type: "API_INVOCATION", payload };
};
