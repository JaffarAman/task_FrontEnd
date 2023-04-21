import { combineReducers } from "redux";
import { LoginReducer, SignUpReducer } from "./AuthReducers";
import {
  AddPaymentReducer,
  GetPaymentReducer,
  DeletePaymentReducer,
  MarkAsPaidReducer,
  EditPaymentReducer,
} from "./PaymentReducers";
import {
  GetNotificationReducer,
  CountNotificationReducer,
} from "./NotifcationReducers";

const reducers = combineReducers({
  LoginReducer,
  SignUpReducer,
  AddPaymentReducer,
  GetPaymentReducer,
  DeletePaymentReducer,
  GetNotificationReducer,
  CountNotificationReducer,
  MarkAsPaidReducer,
  EditPaymentReducer,
});

export default reducers;
