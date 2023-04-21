import { getToken } from "@firebase/messaging";
import { messaging } from "../firebase";

const notificationRequestToken = () => {
  return new Promise((resolve, reject) => {
    function requestPermission() {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          getToken(messaging, {
            vapidKey:
              "BIheNCYPDZW222o3foUSdrvEDOJ22IqWowGLPOSFiL6yVXMtVNqAm_Vd3eJWz5YbnH_xnDsMukwhbHdhVSTOEPA",
          })
            .then((token) => {
              console.log("token");
              resolve(token);
            })
            .catch((err) => {
              console.log("error token get", err);
              reject(err.message);
            });
        } else {
          console.log("Notification permission denied.");
          reject("Notification permission denied.");
        }
      });
    }
    requestPermission();
  });
};

export default notificationRequestToken;
