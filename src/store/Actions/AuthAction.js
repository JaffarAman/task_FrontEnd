import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Strings from "../../constants/Strings";
import { auth, db } from "../../firebase";
import ActionTypes from "../constants";
import {
  getMethodWithoutToken,
  postMethodCustomHeader,
  postMethodWithoutToken,
} from "../../utils/response";
import notificationRequestToken from "../../utils/notificationRequestToken";

const LoginAction = (obj, toast, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.USER_LOGIN_LOADING,
      });
      const loginResult = await signInWithEmailAndPassword(
        auth,
        obj.emailAddress,
        obj.password
      );

      const userId = loginResult.user.uid;
      const response = await getMethodWithoutToken(`api/v1/getuser/${userId}`);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      dispatch({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: response.data,
      });
      toast.success(Strings.login.successMessage);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ActionTypes.USER_LOGIN_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const SignUpAction = (obj, toast, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.USER_SIGNUP_LOADING,
      });
      const authResult = await createUserWithEmailAndPassword(
        auth,
        obj.emailAddress,
        obj.password
      );
      // const deviceToken = await notificationRequestToken();
      const objToSend = {
        firstName: obj.firstName,
        lastName: obj.lastName,
        userId: authResult.user.uid,
        email: obj.emailAddress,
        deviceId: "",
      };
      const response = await postMethodWithoutToken("api/v1/user", objToSend);

      dispatch({
        type: ActionTypes.USER_SIGNUP_SUCCESS,
      });
      toast.success(Strings.signup.successMessage);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      toast.error(Strings.errorMessage);
      dispatch({
        type: ActionTypes.USER_SIGNUP_FAIL,
      });
    }
  };
};

const UpdateDeviceIDAction = (userId, deviceId, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.UPDATE_DEVICEID_REQUEST,
      });

      const objToSend = {
        userId,
        deviceId,
      };
      const response = await postMethodCustomHeader(
        "api/v1/deviceid",
        objToSend
      );

      if (response.data.success) {
        dispatch({
          type: ActionTypes.UPDATE_DEVICEID_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.UPDATE_DEVICEID_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.UPDATE_DEVICEID_FAIL,
      });
      toast.error(error?.data?.message || Strings.errorMessage);
    }
  };
};

export { LoginAction, SignUpAction, UpdateDeviceIDAction };
