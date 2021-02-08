const initState = {
  pollActionError: null,
};
const pollReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POLL":
      console.log("created poll", action.poll);
      return state;
    case "CREATE_POLL_ERROR":
      console.log("created poll error", action.err);
      return {
        state,
        pollActionError: action.err.message,
      };
    case "DELETE_POLL":
      console.log("deleted poll", action.poll);
      return state;
    case "DELETE_POLL_ERROR":
      console.log("deleted poll error", action.err);
      return {
        state,
        pollActionError: action.err.message,
      };
    case "DISABLE_POLL":
      console.log("disabled poll", action.poll);
      return state;
    case "DISABLE_POLL_ERROR":
      console.log("disabled poll error", action.err);
      return {
        state,
        pollActionError: action.err.message,
      };
    case "SUBMIT_POLL":
      console.log("submitted poll", action.poll);
      return state;
    case "SUBMIT_POLL_ERROR":
      console.log("submitted poll error", action.err);
      return {
        state,
        pollActionError: action.err.message,
      };
    default:
      return {
        state,
        pollActionError: null,
      };
  }
};

export default pollReducer;
