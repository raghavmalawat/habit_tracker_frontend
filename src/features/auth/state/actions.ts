import constants from "./constants";
import { createAction } from "typesafe-actions";

const authInit = createAction(constants.AUTH.INIT)();

const authSuccess = createAction(constants.AUTH.SUCCESSFUL)();

const authFailure = createAction(
  constants.AUTH.FAILED,
  (message: string) => message
)<string>();

const authResetRequestInit = createAction(constants.AUTH.RESET_REQUEST_INIT)();

const authResetRequestSuccess = createAction(
  constants.AUTH.RESET_REQUEST_SUCCESSFUL
)();

const authResetRequestFailure = createAction(
  constants.AUTH.RESET_REQUEST_FAILED,
  (message: string) => message
)<string>();

const authResetInit = createAction(constants.AUTH.RESET_INIT)();

const authResetSuccess = createAction(constants.AUTH.RESET_SUCCESSFUL)();

const authResetFailure = createAction(
  constants.AUTH.RESET_FAILED,
  (message: string) => message
)<string>();

const actions = {
  authInit,
  authSuccess,
  authFailure,
  authResetRequestInit,
  authResetRequestSuccess,
  authResetRequestFailure,
  authResetInit,
  authResetSuccess,
  authResetFailure
};

export default actions;
