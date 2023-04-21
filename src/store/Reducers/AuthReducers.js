import ActionTypes from "../constants";

const INITIAL_STATES = {
  loginLoading: false,
  loginData: "",
  loginError: "",

  //signUp
  signUpLoading: false,
  signUpData: "",
  signUpError: "",
};

const LoginReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginData: action.payload?.data,
      };
    case ActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
      };
    default:
      return state;
  }
};

const SignUpReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case ActionTypes.USER_SIGNUP_LOADING:
      return {
        ...state,
        signUpLoading: true,
      };
    case ActionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
      };
    case ActionTypes.USER_SIGNUP_FAIL:
      return {
        ...state,
        signUpLoading: false,
      };
    default:
      return state;
  }
};

export { LoginReducer, SignUpReducer };
