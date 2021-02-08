export const createCycle = (cycle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    cycle.users.map((uid) => {
      firestore
        .collection("users")
        .doc(uid)
        .update({
          cycles: firebase.firestore.FieldValue.arrayUnion(cycle.title),
        });
    });
    firestore
      .collection("cycles")
      .doc(cycle.title)
      .set({
        ...cycle,
        trust: 100,
        active: true,
      })
      .then(() => {
        dispatch({ type: "CREATE_CYCLE", cycle });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_CYCLE_ERROR", err });
      });
  };
};

export const deleteCycle = (cycle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("cycles")
      .doc(cycle)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_CYCLE", cycle });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_CYCLE_ERROR", err });
      });
  };
};

export const disableCycle = (cycle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    if (cycle.active === true) {
      firestore
        .collection("cycles")
        .doc(cycle.title)
        .update({
          active: false,
        })
        .then(() => {
          dispatch({ type: "DISABLE_CYCLE", cycle });
        })
        .catch((err) => {
          dispatch({ type: "DISABLE_CYCLE_ERROR", err });
        });
    } else if (cycle.active === false) {
      console.log(cycle.title);
      firestore
        .collection("cycles")
        .doc(cycle.title)
        .update({
          active: true,
        })
        .then(() => {
          dispatch({ type: "DISABLE_CYCLE", cycle });
        })
        .catch((err) => {
          dispatch({ type: "DISABLE_CYCLE_ERROR", err });
        });
    }
  };
};

export const submitBoosts = (indicators, users, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    indicators.forEach((indicator, index) => {
      var currentUser = users[index].uid;
      firestore.collection("users").doc(currentUser.boostUser).update({
        boostsReceived: firebase.firestore.FieldValue.arrayUnion(indicator),
      });
    });

    firestore.collection("users").doc(uid).update({
      boostsWaiting: null,
    });
  };
};
