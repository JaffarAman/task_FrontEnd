import React, { Suspense } from "react";
import { Dashboard, Login, NotificationPage, SignUp } from "./Pages";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Colors from "./constants/Colors";
import { ToastCmp } from "./Components";
import ProtectedRoute from "./config/Routes/ProtectedRoutes";
import { useEffect } from "react";
import notificationRequestToken from "./utils/notificationRequestToken";
import { messaging } from "./firebase";
import { onMessage } from "firebase/messaging";
import AuthRoute from "./config/Routes/AuthRoute";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UpdateDeviceIDAction } from "./store/Actions/AuthAction";
import { CountNotificationAction } from "./store/Actions/NotificationActions";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primaryColor,
      },
      secondary: {
        main: Colors.black,
      },
    },
  });

  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.LoginReducer);
  const getDeviceToken = async () => {
    try {
      const token = await notificationRequestToken();
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData.device_id !== token) {
        dispatch(UpdateDeviceIDAction(userData.user_id, token, toast));
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.user_id) {
      getDeviceToken();
      onMessage(messaging, (payload) => {
        if (payload) {
          toast.success(payload.notification.body);
          dispatch(CountNotificationAction(toast));
        }
      });
    }
  }, [loginData]);
  return (
    <>
      <Suspense fallback={<div>LOADING...</div>}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notification" element={<NotificationPage />} />
            </Route>
            <Route path="*" element={<h1>404 Page not found</h1>} />
          </Routes>
        </ThemeProvider>
      </Suspense>
      <ToastCmp />
    </>
  );
};

export default App;
