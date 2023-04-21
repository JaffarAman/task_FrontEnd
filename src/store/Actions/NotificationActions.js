import Strings from "../../constants/Strings";
import {
  getMethodCustomHeader,
  postMethodCustomHeader,
} from "../../utils/response";
import ActionTypes from "../constants";

const GetNotificationAction = (toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.GET_NOTIFICATION_LOADING,
      });

      const userId = JSON.parse(localStorage.getItem("userData")).user_id;

      const response = await getMethodCustomHeader(
        `api/v1/notification/${userId}`
      );
      console.log(response, "response GetNotificationAction");

      if (response.data.success) {
        dispatch({
          type: ActionTypes.GET_NOTIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.GET_NOTIFICATION_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_NOTIFICATION_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const MarkAllNotificationAction = (toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.MARK_ALL_NOTIFICATION_LOADING,
      });

      const userId = JSON.parse(localStorage.getItem("userData")).user_id;

      const objToSend = {
        userId,
      };
      const response = await postMethodCustomHeader(
        `api/v1/markallnotification`,
        objToSend
      );

      if (response.data.success) {
        dispatch({
          type: ActionTypes.MARK_ALL_NOTIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.MARK_ALL_NOTIFICATION_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.MARK_ALL_NOTIFICATION_FAIL,
      });
      toast.error(error.data.message || Strings.errorMessage);
    }
  };
};

const CountNotificationAction = (toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.COUNT_NOTIFICATION_LOADING,
      });

      const userId = JSON.parse(localStorage.getItem("userData")).user_id;

      const objToSend = {
        userId,
      };
      const response = await getMethodCustomHeader(
        `api/v1/notificationcount/${userId}`
      );

      if (response.data.success) {
        dispatch({
          type: ActionTypes.COUNT_NOTIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.COUNT_NOTIFICATION_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.COUNT_NOTIFICATION_FAIL,
      });
      toast.error(error.data.message || Strings.errorMessage);
    }
  };
};

const NotificationCountZero = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.NOTIFICATION_COUNT_ZERO,
    });
  };
};

export {
  GetNotificationAction,
  MarkAllNotificationAction,
  CountNotificationAction,
  NotificationCountZero,
};
