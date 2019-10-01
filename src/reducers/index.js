import { combineReducers } from "redux";
import authReducer from "./authReducers";
import courseReducers from "./courseReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
  auth: authReducer,
  course: courseReducers,
  errors: errorReducer
});