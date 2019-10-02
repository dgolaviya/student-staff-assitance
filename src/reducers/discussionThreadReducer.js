import isEmpty from "is-empty";
import {
  FETCH_DISCUSSION_THREADS_PENDING,
  FETCH_DISCUSSION_THREADS_SUCCESS,
  FETCH_DISCUSSION_THREADS_FAILED,
  UPDATE_DISCUSSION_THREAD_FAILED,
  UPDATE_DISCUSSION_THREAD_SUCCESS,
  UPDATE_DISCUSSION_THREAD_PENDING,
  CREATE_DISCUSSION_THREAD_FAILED,
  CREATE_DISCUSSION_THREAD_SUCCESS,
  CREATE_DISCUSSION_THREAD_PENDING,
  SET_DISCUSSION_THREAD_EDIT_ID
} from "../actions/types";

const initialState = {
  discussionThreads: [],
  discussionChats: [],
  discussionThreadUpdateId: "",
  isDiscussionThreadsUpdated: false,
  loading: false,
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_DISCUSSION_THREADS_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case FETCH_DISCUSSION_THREADS_SUCCESS:
      return {
        ...state,
        discussionThreads: action.payload.data.data,
        loading: false,
        success: true,
        isDiscussionThreadsUpdated: false
      };
    case FETCH_DISCUSSION_THREADS_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };
    case CREATE_DISCUSSION_THREAD_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case CREATE_DISCUSSION_THREAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isDiscussionThreadsUpdated: true
      };
    case CREATE_DISCUSSION_THREAD_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };
    case UPDATE_DISCUSSION_THREAD_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case UPDATE_DISCUSSION_THREAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isDiscussionThreadsUpdated: true
      };
    case UPDATE_DISCUSSION_THREAD_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };

    case SET_DISCUSSION_THREAD_EDIT_ID:
      return {
        ...state,
        discussionThreadUpdateId: action.payload
      };

    default:
      return state;
  }
}
