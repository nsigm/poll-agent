const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNIN_ERROR":
      return {
        ...state,
        authError: "Action failed",
      };
    case "SIGNIN_SUCCESS":
      console.log("signin success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      console.log("signup failed");
      return {
        ...state,
        authError: action.err.message,
      };
    case "RESET_SUCCESS":
      console.log("reset success");
      return {
        ...state,
        authError: null,
      };
    case "RESET_ERROR":
      console.log("reset error");
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
