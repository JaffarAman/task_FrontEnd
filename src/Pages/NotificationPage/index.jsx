import React, { useEffect } from "react";

import styles from "./NotificationPage.module.css";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationAction,
  MarkAllNotificationAction,
  NotificationCountZero,
} from "../../store/Actions/NotificationActions";
import { toast } from "react-toastify";
import { Navbar } from "../../Components";
import CircularProgress from "@mui/material/CircularProgress";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { getNotificationLoading, getNotificationData } = useSelector(
    (state) => state.GetNotificationReducer
  );

  useEffect(() => {
    dispatch(GetNotificationAction(toast));
  }, []);

  useEffect(() => {
    if (getNotificationData) {
      dispatch(MarkAllNotificationAction(toast));
      dispatch(NotificationCountZero());
    }
  }, [getNotificationData]);

  return (
    <>
      <Navbar />

      <section className={styles.notificationPageWrapper}>
        {getNotificationLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              width: { xs: "90%", sm: "90%", md: "80%", lg: "60%" },
            }}
            className={styles.notificationList}
          >
            <Box className={styles.notiHEading}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Notification
              </Typography>
            </Box>

            {getNotificationData &&
              getNotificationData?.map((notification) => (
                <NotificationBar
                  key={notification._id}
                  notificationData={notification}
                />
              ))}
          </Box>
        )}
      </section>
    </>
  );
};

const NotificationBar = ({ notificationData }) => {
  return (
    <Box
      className={styles.notification}
      sx={{ background: !notificationData.is_seen && "#eeebff" }}
    >
      <div className={styles.userPic}>
        <Avatar />
      </div>

      <Box className={styles.notificationContent}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Typography sx={{ fontWeight: "bold" }}>
            {notificationData?.notification?.title}
          </Typography>
          <Typography sx={{ fontSize: "small", color: "var(--textColor)" }}>
            {new Date(notificationData.created_on).toDateString()} &nbsp;
            {new Date(notificationData.created_on).toLocaleTimeString()}
          </Typography>
        </Box>
        <Box sx={{ fontSize: "small", color: "var(--textColor)" }}>
          <Typography>{notificationData?.notification?.body}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationPage;
