import Strings from "../../constants/Strings";
import {
  deleteMethodCustomHeader,
  getMethodCustomHeader,
  postMethodCustomHeader,
  putMethodCustomHeader,
} from "../../utils/response";
import ActionTypes from "../constants";

const AddPaymentAction = (obj, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.ADD_PAYMENT_LOADING,
      });

      const userId = JSON.parse(localStorage.getItem("userData")).user_id;
      const objToSend = {
        ...obj,
        userId,
      };
      const response = await postMethodCustomHeader(
        `api/v1/payment`,
        objToSend
      );
      if (response.data.success) {
        dispatch({
          type: ActionTypes.ADD_PAYMENT_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.ADD_PAYMENT_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.ADD_PAYMENT_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const AddPaymentEmptyAction = (obj, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.ADD_PAYMENT_EMPTY,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.ADD_PAYMENT_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const GetPaymentAction = (toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.GET_PAYMENT_LOADING,
      });

      const userId = JSON.parse(localStorage.getItem("userData")).user_id;

      const response = await getMethodCustomHeader(`api/v1/payment/${userId}`);

      if (response.data.success) {
        dispatch({
          type: ActionTypes.GET_PAYMENT_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.GET_PAYMENT_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_PAYMENT_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const DeletePaymentAction = (id, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.DELETE_PAYMENT_LOADING,
      });

      const response = await deleteMethodCustomHeader(`api/v1/payment/${id}`);
      console.log(response, "response delete");

      if (response.data.success) {
        toast.success(Strings.payments.deleteSuccessMsg);
        dispatch({
          type: ActionTypes.DELETE_PAYMENT_SUCCESS,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.DELETE_PAYMENT_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.DELETE_PAYMENT_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const MarkAsPaidAction = (paymentId, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.MARK_AS_PAID_LOADING,
      });

      const objToSend = {
        paymentId,
      };
      const response = await postMethodCustomHeader(
        `api/v1/payment/markaspaid`,
        objToSend
      );
      console.log(response, "response MarkAsPaidAction");

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch({
          type: ActionTypes.MARK_AS_PAID_SUCCESS,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.MARK_AS_PAID_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.MARK_AS_PAID_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const EditPaymentAction = (obj, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.EDIT_PAYMENT_LOADING,
      });

      const objToSend = {
        ...obj,
      };
      const response = await putMethodCustomHeader(`api/v1/payment`, objToSend);
      console.log("response edir", response);
      if (response.data.success) {
        dispatch({
          type: ActionTypes.EDIT_PAYMENT_SUCCESS,
          payload: response.data,
        });
      } else {
        toast.error(response.data.message);
        dispatch({
          type: ActionTypes.EDIT_PAYMENT_FAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.EDIT_PAYMENT_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

const EditPaymentEmptyAction = (obj, toast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.ADD_PAYMENT_EMPTY,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.ADD_PAYMENT_FAIL,
      });
      toast.error(Strings.errorMessage);
    }
  };
};

export {
  AddPaymentAction,
  AddPaymentEmptyAction,
  GetPaymentAction,
  DeletePaymentAction,
  MarkAsPaidAction,
  EditPaymentAction,
  EditPaymentEmptyAction,
};
