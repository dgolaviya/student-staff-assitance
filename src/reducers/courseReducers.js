import isEmpty from 'is-empty';
import {
  FETCH_COURSES_PENDING, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILED,
  CREATE_COURSE_PENDING, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILED,
  DELETE_COURSE_SUCCESS,
  FETCH_ENROLLED_COURSES_SUCCESS, FETCH_ENROLLED_COURSES_FAILED,
  FETCH_AVAILABLE_COURSES_SUCCESS, FETCH_AVAILABLE_COURSES_FAILED,
  ENROLL_COURSE_PENDING, ENROLL_COURSE_SUCCESS, ENROLL_COURSE_FAILED
} from "../actions/types";

const initialState = {
  courses: [],
  enrolledCourses: [],
  availableCourses: [],
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
      const enrolledCourseIds = action.payload.data.data.map(course => course.enrollCourseId.courseId);
      let approveStatuses = {};
      action.payload.data.data.forEach(course => (
        approveStatuses = {...approveStatuses, [course.enrollCourseId.courseId]: course.approved}
      ));
      const enrolledCourses = state.courses.filter(course => enrolledCourseIds.includes(course.courseId));
      const updatedEnrolledCourses = enrolledCourses.map((course) => {
        return {
          ...course,
          approved: approveStatuses[course.courseId]
        }
      });
      return {
        ...state,
        enrolledCourses: updatedEnrolledCourses,
        loading: false,
        success: true
      }
    case FETCH_ENROLLED_COURSES_FAILED:
      return {
        ...state,
        enrolledCourses: [],
        loading: false,
        success: true
      }
    case FETCH_AVAILABLE_COURSES_SUCCESS:
      return {
        ...state,
        availableCourses: action.payload.data.data,
        loading: false,
        success: true
      }
    case FETCH_AVAILABLE_COURSES_FAILED:
      return {
        ...state,
        availableCourses: [],
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
    case ENROLL_COURSE_SUCCESS:
      const enrolledCourseId = action.payload.data.data[0].enrollCourseId.courseId;
      const enrolledCourse = state.courses.filter(course => course.courseId === enrolledCourseId);
      const newEnrolledCourses = [
        ...state.enrolledCourses,
        ...enrolledCourse
      ];
      return {
        ...state,
        enrolledCourses: newEnrolledCourses,
        loading: false,
        success: true
      }
    case ENROLL_COURSE_FAILED:
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