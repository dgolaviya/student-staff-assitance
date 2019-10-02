import isEmpty from 'is-empty';
import {
  FETCH_COURSES_PENDING, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILED,
  CREATE_COURSE_PENDING, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILED,
  DELETE_COURSE_SUCCESS,
  FETCH_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_FAILED
} from "../actions/types";

const initialState = {
  courses: [],
  enrolledCourses: [],
  loading: false,
  success: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      }
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.data.data,
        loading: false,
        success: true
      }
    case FETCH_COURSES_FAILED:
      return {
        ...state,
        courses: [],
        loading: false,
        success: false
      }
    case FETCH_ENROLLED_COURSES_SUCCESS:
      return {
        ...state,
        enrolledCourses: action.payload.data.data,
        loading: false,
        success: true
      }
    case FETCH_ENROLLED_COURSES_FAILED:
      return {
        ...state,
        enrolledCourses: action.payload.data.data,
        loading: false,
        success: true
      }
    case CREATE_COURSE_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      }
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, ...action.payload.data.data],
        loading: false,
        success: true
      }
    case CREATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      }
    case DELETE_COURSE_SUCCESS:
      const newCourses = state.courses.filter(course => {
        return course.courseId !== action.actualAction.courseId;
      });
      return {
        ...state,
        courses: newCourses,
        loading: false,
        success: false
      }
    default:
      return state;
  }
}