import isEmpty from 'is-empty';
import {
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_USER_ROLES_SUCCESS, FETCH_DEPARTMENTS_SUCCESS, FETCH_PROGRAMS_SUCCESS,
  REGISTER_USER_PENDING, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
  LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGOUT_USER,
  RESET_AUTH_ERROR,
  FETCH_AVATAR_IMAGE_SUCCESS,
  RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
  GET_ALL_USERS_PENDING, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILED
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  userRoles: [],
  allUsers: [],
  departments: [],
  programs: [],
  loading: false,
  success: false,
  error: undefined,
  avatarDetail: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(JSON.parse(action.payload)),
        user: JSON.parse(action.payload)
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_ROLES_SUCCESS:
      return {
        ...state,
        userRoles: action.payload.data.data
      }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.data.data
      }
    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.payload.data.data
      }
    case FETCH_PROGRAMS_SUCCESS:
      return {
        ...state,
        programs: action.payload.data.data
      }
    case REGISTER_USER_PENDING:
      return {
        ...state,
        loading: true,
        success: false,
        error: undefined
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: undefined
      }
    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.response.message
      }
    case RESET_PASSWORD_PENDING:
      return {
        ...state,
        loading: true,
        success: false,
        error: undefined
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: undefined
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.response.message
      }
    case LOGIN_USER_PENDING:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: {}
      }
    case FETCH_AVATAR_IMAGE_SUCCESS:
      return {
        ...state,
        avatarDetail: action.payload.data.data
      }
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.data.data));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.data.data
      }
    case LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        isAsuthenticated: false
      }
    case LOGOUT_USER:
      return { ...initialState }
    case RESET_AUTH_ERROR: {
      return {
        ...state,
        error: undefined
      };
    }
    default:
      return state;
  }
}