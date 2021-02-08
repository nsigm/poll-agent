const initState = {
  adminActionError: null,
};
const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      console.log("added user", action.user);
      return state;
    case "ADD_USER_ERROR":
      console.log("add user error", action.err);
      return {
        state,
        adminActionError: action.err.message,
      };
    case "DELETE_USER":
      console.log("deleted user", action.uid);
      return state;
    case "DELETE_USER_ERROR":
      console.log("deleted user error", action.err);
      return {
        state,
        adminActionError: action.err.message,
      };
    case "ADD_INDICATOR":
      console.log("added indicator", action.kpi);
      return state;
    case "ADD_INDICATOR_ERROR":
      console.log("add indicator error", action.err);
      return {
        state,
        adminActionError: action.err.message,
      };
    case "DELETE_INDICATOR":
      console.log("deleted indicator", action.kpi);
      return state;
    case "DELETE_INDICATOR_ERROR":
      console.log("deleted indicator error", action.err);
      return {
        state,
        adminActionError: action.err.message,
      };
    case "ADD_QUESTION":
      console.log("added question", action.question);
      return state;
    case "ADD_QUESTION_ERROR":
      console.log("added question error", action.err);
      return {
        state,
        adminActionError: action.err.message,
      };
    default:
      return {
        state,
        adminActionError: null,
      };
  }
};

export default adminReducer;
