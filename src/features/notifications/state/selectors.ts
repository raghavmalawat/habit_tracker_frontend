import { Selector } from "reselect";

import { AppState } from "../../types";

const getNotifications: Selector<AppState, Notification[]> = (
  state: AppState
) => state.notifications;

export { getNotifications };
