import { Dispatch } from "redux";
import { history } from "../../../routes/history";
import {
  login,
  resetPassword,
  updatePassword
} from "../../../services/auth.service";
import { authRoutes } from "../authRoutes";
import { AUTH_STRINGS } from "./constants";
import jwt_decode from "jwt-decode";

import actions from "./actions";
import { clearLocalStore } from "../../../utils/storage.utils";
import authUtils from "./util";
import { User } from "./models";

const authenticateUser = (email: string, password: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(actions.authInit());
  try {
    const authToken = await login(email, password);
    if (authToken) {
      const userDetails: User = jwt_decode(authToken);

      dispatch(actions.authSuccess());
      authUtils.addUserDetailToLocalStore({
        ...userDetails,
        ...{ token: authToken }
      });

      history.push(authRoutes.DASHBOARD);
    }
  } catch (err) {
    if (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = JSON.parse(err.message);
      }
      const message =
        errorMessage
          ? errorMessage
          : AUTH_STRINGS.SOMETHING_WENT_WRONG;
      dispatch(actions.authFailure(message));
    } else {
      dispatch(actions.authFailure(AUTH_STRINGS.SOMETHING_WENT_WRONG));
    }
  }
};

const unAuthenticateUser = () => {
  clearLocalStore();
  history.push(authRoutes.ROOT);
};

// Check if token expired
const checkAuthentication = (): boolean => {
  const userDetails = authUtils.getUserDetailFromLocalStore();

  if (userDetails === null) {
    return false;
  }

  return Math.round(Date.now() / 1000) <= userDetails.exp;
};

const requestPasswordReset = (email: string) => async (dispatch: Dispatch) => {
  dispatch(actions.authResetRequestInit());
  try {
    await resetPassword(email);
    dispatch(actions.authResetRequestSuccess());
  } catch (err) {
    if (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = JSON.parse(err.message);
      }
      const message =
        errorMessage 
          ? errorMessage
          : AUTH_STRINGS.SOMETHING_WENT_WRONG;
      dispatch(actions.authResetRequestFailure(message));
    } else {
      dispatch(
        actions.authResetRequestFailure(AUTH_STRINGS.SOMETHING_WENT_WRONG)
      );
    }
  }
};

const submitPasswordReset = (
  token: string,
  newPassword: string,
  newPasswordConfirmation: string
) => async (dispatch: Dispatch) => {
  dispatch(actions.authResetInit());
  if (newPassword !== newPasswordConfirmation) {
    dispatch(actions.authResetFailure(AUTH_STRINGS.PASSWORDS_DO_NOT_MATCH));
    return;
  }
  try {
    await updatePassword(token, newPassword, newPasswordConfirmation);
    dispatch(actions.authResetSuccess());
  } catch (err) {
    if (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = JSON.parse(err.message);
      }
      const message =
        errorMessage
          ? errorMessage
          : AUTH_STRINGS.SOMETHING_WENT_WRONG;
      dispatch(actions.authResetFailure(message));
    } else {
      dispatch(actions.authResetFailure(AUTH_STRINGS.SOMETHING_WENT_WRONG));
    }
  }
};

const getAuthToken = (): string | null => {
  const userDetails = authUtils.getUserDetailFromLocalStore();

  if (userDetails === null) {
    return null;
  }

  const { token } = userDetails;
  if (token === null || token === undefined) {
    return null;
  }

  return userDetails.token;
};

const getUserRole = () => {
  const userDetails = authUtils.getUserDetailFromLocalStore();

  if (userDetails === null) {
    return null;
  }

  return userDetails.role;
};

const operations = {
  authenticateUser,
  requestPasswordReset,
  checkAuthentication,
  unAuthenticateUser,
  submitPasswordReset,
  getAuthToken,
  getUserRole
};

export default operations;
