// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDb3ltJHAxn1_AnDbQbAc5gOeH5_1pQ3ZA",
  authDomain: "reminder-payment-app.firebaseapp.com",
  projectId: "reminder-payment-app",
  storageBucket: "reminder-payment-app.appspot.com",
  messagingSenderId: "376489703611",
  appId: "1:376489703611:web:3ed6c6968111f79c0b919e",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
