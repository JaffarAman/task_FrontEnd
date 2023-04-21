import ActionTypes from "../constants";

const INITIAL_STATES = {
  getNotificationLoading: false,
  getNotificationData: "",

  ///COUNT NOTI
  countNotificationLoading: false,
  countNotificationData: "",
};

const GetNotificationReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATION_LOADING:
      return {
        ...state,
        getNotificationLoading: true,
      };
    case ActionTypes.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        getNotificationLoading: false,
        getNotificationData: action.payload.data,
      };
    case ActionTypes.GET_NOTIFICATION_FAIL:
      return {
        ...state,
        getNotificationLoading: false,
      };
    default:
      return state;
  }
};

const CountNotificationReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.COUNT_NOTIFICATION_LOADING:
      return {
        ...state,
        countNotificationLoading: true,
      };
    case ActionTypes.COUNT_NOTIFICATION_SUCCESS:
      return {
        ...state,
        countNotificationLoading: false,
        countNotificationData: action.payload.data,
      };
    case ActionTypes.COUNT_NOTIFICATION_FAIL:
      return {
        ...state,
        countNotificationLoading: false,
      };
    case ActionTypes.NOTIFICATION_COUNT_ZERO:
      return {
        ...state,
        countNotificationData: 0,
      };
    default:
      return state;
  }
};

export { GetNotificationReducer, CountNotificationReducer };
