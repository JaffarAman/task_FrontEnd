import ActionTypes from "../constants";

const INITIAL_STATES = {
  addPaymentLoading: false,
  addPaymentData: false,
  addPaymentError: "",

  //get payments
  getPaymentLoading: false,
  getPaymentData: [],

  //delete payments
  deletePaymentLoading: false,
  deletePaymentData: false,

  //mark as paid payments
  markAsPaidLoading: false,
  markAsPaidData: false,

  //edit payment
  editPaymentLoading: false,
  editPaymentData: false,
};

const AddPaymentReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PAYMENT_LOADING:
      return {
        ...state,
        addPaymentLoading: true,
      };
    case ActionTypes.ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        addPaymentLoading: false,
        addPaymentData: true,
      };
    case ActionTypes.ADD_PAYMENT_FAIL:
      return {
        ...state,
        addPaymentLoading: false,
      };
    case ActionTypes.ADD_PAYMENT_EMPTY:
      return {
        ...state,
        addPaymentLoading: false,
        addPaymentData: false,
      };
    default:
      return state;
  }
};

const GetPaymentReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.GET_PAYMENT_LOADING:
      return {
        ...state,
        getPaymentLoading: true,
      };
    case ActionTypes.GET_PAYMENT_SUCCESS:
      return {
        ...state,
        getPaymentLoading: false,
        getPaymentData: action.payload.data,
      };
    case ActionTypes.GET_PAYMENT_FAIL:
      return {
        ...state,
        getPaymentLoading: false,
      };

    default:
      return state;
  }
};

const DeletePaymentReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_PAYMENT_LOADING:
      return {
        ...state,
        deletePaymentLoading: true,
      };
    case ActionTypes.DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        deletePaymentLoading: false,
        deletePaymentData: !state.deletePaymentData,
      };
    case ActionTypes.DELETE_PAYMENT_FAIL:
      return {
        ...state,
        deletePaymentLoading: false,
      };

    default:
      return state;
  }
};

const MarkAsPaidReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.MARK_AS_PAID_LOADING:
      return {
        ...state,
        markAsPaidLoading: true,
      };
    case ActionTypes.MARK_AS_PAID_SUCCESS:
      return {
        ...state,
        markAsPaidLoading: false,
        markAsPaidData: !state.markAsPaidData,
      };
    case ActionTypes.MARK_AS_PAID_FAIL:
      return {
        ...state,
        markAsPaidLoading: false,
      };

    default:
      return state;
  }
};

const EditPaymentReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_PAYMENT_LOADING:
      return {
        ...state,
        editPaymentLoading: true,
      };
    case ActionTypes.EDIT_PAYMENT_SUCCESS:
      return {
        ...state,
        editPaymentLoading: false,
        editPaymentData: true,
      };
    case ActionTypes.EDIT_PAYMENT_FAIL:
      return {
        ...state,
        editPaymentLoading: false,
      };
    case ActionTypes.EDIT_PAYMENT_EMPTY:
      return {
        ...state,
        editPaymentLoading: false,
        editPaymentData: false,
      };
    default:
      return state;
  }
};

export {
  AddPaymentReducer,
  GetPaymentReducer,
  DeletePaymentReducer,
  MarkAsPaidReducer,
  EditPaymentReducer,
};
