import produce from "immer";
import { getType, PayloadAction } from "typesafe-actions";
import actions from "./actions";
import { AuthState, initialAuthState } from "./models";

const auth = produce((state: AuthState, action: PayloadAction<string, any>) => {
  switch (action.type) {
    case getType(actions.authInit):
      state.ui.isLoading = true;
      return state;
    case getType(actions.authSuccess):
      state.ui.isLoading = false;
      state.ui.error = null;
      return state;
    case getType(actions.authFailure):
      state.ui.isLoading = false;
      state.ui.error = action.payload;
      return state;
    case getType(actions.authResetRequestInit):
      state.ui.isLoading = true;
      return state;
    case getType(actions.authResetRequestSuccess):
      state.ui.isLoading = false;
      state.ui.resetPasswordSuccess = true;
      state.ui.error = null;
      return state;
    case getType(actions.authResetRequestFailure):
      state.ui.isLoading = false;
      state.ui.resetPasswordSuccess = false;
      state.ui.error = action.payload;
      return state;
    case getType(actions.authResetInit):
      state.ui.isLoading = true;
      return state;
    case getType(actions.authResetSuccess):
      state.ui.isLoading = false;
      state.ui.submitPasswordSuccess = true;
      state.ui.error = null;
      return state;
    case getType(actions.authResetFailure):
      state.ui.isLoading = false;
      state.ui.submitPasswordSuccess = false;
      state.ui.error = action.payload;
      return state;
    default:
      return state;
  }
}, initialAuthState);

export default auth;
