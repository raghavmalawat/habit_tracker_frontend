import {
  getItemFromLocalStore,
  setItemInLocalStore
} from "../../../utils/storage.utils";

import { AUTH_STORAGE_KEYS } from "./constants";
import { User } from "./models";

const getUserDetailFromLocalStore = (): User | null => {
  const details = getItemFromLocalStore(AUTH_STORAGE_KEYS.USER_DETAILS);

  if (!details || details === "") {
    return null;
  }
  return JSON.parse(details);
};

const addUserDetailToLocalStore = (userDetails: User): any => {
  setItemInLocalStore(
    AUTH_STORAGE_KEYS.USER_DETAILS,
    JSON.stringify(userDetails)
  );

  return true;
};

const removeUserDetailFromLocalStore = (): any => {
  setItemInLocalStore(AUTH_STORAGE_KEYS.USER_DETAILS, "");
  return true;
};

const authUtils = {
  getUserDetailFromLocalStore,
  addUserDetailToLocalStore,
  removeUserDetailFromLocalStore
};

export default authUtils;
