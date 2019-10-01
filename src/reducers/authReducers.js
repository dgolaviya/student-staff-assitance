import isEmpty from 'is-empty';
import {
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_USER_ROLES_SUCCESS, FETCH_DEPARTMENTS_SUCCESS, FETCH_PROGRAMS_SUCCESS,
  REGISTER_USER_PENDING, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
  LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  userRoles: [],
  departments: [],
  programs: [],
  loading: false,
  success: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
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
        success: false
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      }
      case LOGIN_USER_PENDING:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: {}
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
    default:
      return state;
  }
}