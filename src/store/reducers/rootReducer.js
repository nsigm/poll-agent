import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import adminReducer from "./adminReducer";
import pollReducer from "./pollReducer";
import cycleReducer from "./cycleReducer";

const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  poll: pollReducer,
  cycle: cycleReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
