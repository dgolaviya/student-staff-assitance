import isEmpty from "is-empty";
import {
  FETCH_EVENTS_PENDING,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILED,
  UPDATE_EVENT_FAILED,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_PENDING,
  CREATE_EVENT_FAILED,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_PENDING
} from "../actions/types";

const initialState = {
  events: [],
  announcements: [],
  news: [],
  announcementUpdateId: "",
  isAnnouncementsUpdated: false,
  isNewsUpdated: false,
  loading: false,
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case FETCH_EVENTS_SUCCESS:
      let announcementsData = action.payload.data.data.filter(
        v => v.eventCategory === "announcement"
      );
      let newsData = action.payload.data.data.filter(
        v => v.eventCategory === "news"
      );
      return {
        ...state,
        events: action.payload.data.data,
        announcements: announcementsData,
        news: newsData,
        loading: false,
        success: true,
        isAnnouncementsUpdated: false
      };
    case FETCH_EVENTS_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };
    case CREATE_EVENT_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAnnouncementsUpdated: true
      };
    case CREATE_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };
    case UPDATE_EVENT_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAnnouncementsUpdated: true
      };
    case UPDATE_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };

    default:
      return state;
  }
}
