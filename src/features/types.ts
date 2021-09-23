import { AuthState } from "./auth/state/models";

export interface AppState {
  auth: AuthState;
  notifications: Notification[];
}
