const initState = {
  cycleActionError: null,
};
const cycleReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_CYCLE":
      console.log("created cycle", action.cycle);
      return state;
    case "CREATE_CYCLE_ERROR":
      console.log("created cycle error", action.err);
      return {
        state,
        cycleActionError: action.err.message,
      };
    case "DELETE_CYCLE":
      console.log("deleted cycle", action.cycle);
      return state;
    case "DELETE_CYCLE_ERROR":
      console.log("deleted cycle error", action.err);
      return {
        state,
        cycleActionError: action.err.message,
      };
    case "DISABLE_CYCLE":
      console.log("disabled cycle", action.question);
      return state;
    case "DISABLE_CYCLE_ERROR":
      console.log("disabled cycle error", action.err);
      return {
        state,
        cycleActionError: action.err.message,
      };
    case "SUBMIT_CYCLE":
      console.log("submitted cycle", action.question);
      return state;
    case "SUBMIT_CYCLE_ERROR":
      console.log("submitted cycle error", action.err);
      return {
        state,
        cycleActionError: action.err.message,
      };
      case "CREATE_FEEDBACK":
        console.log("created feedback", action.feedback);
        return state;
      case "CREATE_FEEDBACK_ERROR":
        console.log("create feedback error", action.err);
        return state;
      case "DELETE_FEEDBACK":
        console.log("deleted feedback", action.feedback);
        return state;
      case "DELETE_FEEDBACK_ERROR":
        console.log("deleted feedback error", action.err);
        return state;
    default:
      return {
        state,
        cycleActionError: null,
      };
  }
};

export default cycleReducer;
