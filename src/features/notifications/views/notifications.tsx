import React from "react";
import { useSelector } from "react-redux";
import { getNotifications } from "../state/selectors";
import ReactNotificationSystem from "react-notification-system-redux";
import { fonts } from "../../../theme/foundations/fonts";

const Notifications = () => {
  const notifications = useSelector(getNotifications);

  var style = {
    NotificationItem: {
      DefaultStyle: {
        fontSize: "14px",
        fontFamily: fonts.body,
        fontWeight: 600
      }
    },
    Title: {
      DefaultStyle: {
        fontSize: "16px",
        fontFamily: fonts.heading
      }
    }
  };

  return (
    <ReactNotificationSystem notifications={notifications} style={style} />
  );
};

export { Notifications };
