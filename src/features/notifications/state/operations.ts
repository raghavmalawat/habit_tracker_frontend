import { Dispatch } from "react";
import { Notification } from "react-notification-system";
import Notifications from "react-notification-system-redux";

const getNotificationsOpts = (
  message: string,
  title = "Success",
  actionLabel?: string,
  actionCallback?: () => void
): Notification => ({
  title: title,
  message: message,
  position: "tr",
  autoDismiss: 5,
  dismissible: "none",
  ...(actionLabel &&
    actionCallback && {
      action: {
        label: actionLabel,
        callback: actionCallback
      }
    })
});

const sendSuccessNotification = (
  message: string,
  title = "Success",
  actionLabel?: string,
  actionCallback?: () => void
) => (dispatch: Dispatch<any>) => {
  dispatch(
    Notifications.success(
      getNotificationsOpts(message, title, actionLabel, actionCallback)
    )
  );
};

const sendErrorNotification = (
  message: string,
  title = "Error",
  actionLabel?: string,
  actionCallback?: () => void
) => (dispatch: Dispatch<any>) => {
  dispatch(
    Notifications.error(
      getNotificationsOpts(message, title, actionLabel, actionCallback)
    )
  );
};

export { sendSuccessNotification, sendErrorNotification };
