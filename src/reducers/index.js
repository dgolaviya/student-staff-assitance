import { combineReducers } from "redux";
import authReducer from "./authReducers";
import courseReducers from "./courseReducers";
import errorReducer from "./errorReducers";
import discussionThreadReducer from "./discussionThreadReducer";
import eventsReducer from "./eventsReducer";
import activityReducer from "./activityReducer";
import documentsReducer from "./documentsReducer";

export default combineReducers({
  auth: authReducer,
  course: courseReducers,
  errors: errorReducer,
  discussions: discussionThreadReducer,
  events: eventsReducer,
  activities: activityReducer,
  documents: documentsReducer
});
