/**
 * Index.js
 * Creates enhanced Redux Store with Firebase applied as middleware,
 * making Firestore and Firebase available in the state for the component tree in App.js,
 * react-redux-firebase integration enables us to load Firebase Auth  before we
 * render the DOM to securely manage the user and content flow in the application.
 *
 * @public
 *
 * Redux store integration with Firebase using Thunk into ReactDOM in this file are adapted from the
 * The Net Ninja's React, Redux & Firebase App Tutorial, available for free on YouTube:
 * https://www.youtube.com/watch?v=Oi4v5uxTY5o&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true,
    })
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  serviceWorker.register();
});
