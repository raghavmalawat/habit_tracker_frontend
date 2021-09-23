import { createSelector, Selector } from "reselect";

import { AppState } from "../../types";
import { AuthState } from "./models";

const rootSelector: Selector<AppState, AuthState> = (state: AppState) =>
  state.auth;

const isAuthLoading = createSelector(rootSelector, (state: AuthState) => {
  return state.ui.isLoading;
});

const getAuthError = createSelector(rootSelector, (state: AuthState) => {
  return state.ui.error;
});

const getResetPasswordSuccess = createSelector(
  rootSelector,
  (state: AuthState) => {
    return state.ui.resetPasswordSuccess;
  }
);

const getSubmitPasswordStatus = createSelector(
  rootSelector,
  (state: AuthState) => {
    return state.ui.submitPasswordSuccess;
  }
);

// const isAuthenticated = (state: AppState) =>
//   getAuthToken(state) === null ? false : true;

const selectors = {
  getResetPasswordSuccess,
  getSubmitPasswordStatus,
  isAuthLoading,
  getAuthError
};

export default selectors;
