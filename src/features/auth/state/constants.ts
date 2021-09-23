export const AUTH = {
  INIT: "LEAD_BETA/AUTH/INIT",
  SUCCESSFUL: "LEAD_BETA/AUTH/SUCCESSFUL",
  FAILED: "LEAD_BETA/AUTH/FAILED",
  RESET_REQUEST_INIT: "LEAD_BETA/AUTH/RESET_REQUEST_INIT",
  RESET_REQUEST_SUCCESSFUL: "LEAD_BETA/AUTH/RESET_REQUEST_SUCCESSFUL",
  RESET_REQUEST_FAILED: "LEAD_BETA/AUTH/RESET_REQUEST_FAILED",
  RESET_INIT: "LEAD_BETA/AUTH/RESET_INIT",
  RESET_SUCCESSFUL: "LEAD_BETA/AUTH/RESET_SUCCESSFUL",
  RESET_FAILED: "LEAD_BETA/AUTH/RESET_FAILED"
};

export const AUTH_STRINGS = {
  SOMETHING_WENT_WRONG: "Something went wrong, please try again",
  PASSWORDS_DO_NOT_MATCH:
    "Passwords don't match. Make sure both the passwords are same"
};

export const AUTH_STORAGE_KEYS = {
  USER_DETAILS: "USER_DETAILS"
};

const constants = {
  AUTH,
  AUTH_STRINGS,
  AUTH_STORAGE_KEYS
};
export default constants;
