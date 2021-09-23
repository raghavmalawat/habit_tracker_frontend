import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";

import authReducer from "./auth/state";

export default combineReducers({
  notifications,
  auth: authReducer
});
