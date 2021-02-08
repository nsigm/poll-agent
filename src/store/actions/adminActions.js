export const addUser = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .add({
        firstName: user.firstName,
        lastName: user.lastName,
        initials: user.firstName[0] + user.lastName[0],
        organizationName: "",
        role: "new",
        uid: "",
        status: "pending",
        img: "",
        email: user.email,
      })
      .then(() => {
        dispatch({ type: "ADD_USER", user });
      })
      .catch((err) => {
        dispatch({ type: "ADD_USER_ERROR", err });
      });
  };
};

export const deleteUser = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(uid)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_USER", uid });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_USER_ERROR", err });
      });
  };
};

export const addIndicator = (kpi) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("indicators")
      .doc(kpi.name)
      .set({
        name: kpi.name,
        usage: 0,
        trust: 100,
        questions: [],
      })
      .then(() => {
        dispatch({ type: "ADD_INDICATOR", kpi });
      })
      .catch((err) => {
        dispatch({ type: "ADD_INDICATOR_ERROR", err });
      });
  };
};

export const deleteIndicator = (kpi) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("indicators")
      .doc(kpi)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_INDICATOR", kpi });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_INDICATOR_ERROR", err });
      });
  };
};

export const addQuestion = (question) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("indicators")
      .doc(question.kpi)
      .update({
        questions: firestore.FieldValue.arrayUnion({
          question: question.question,
          minValue: question.minValue,
          maxValue: question.maxValue,
          kpi: question.kpi
        }),
      })
      .then(() => {
        dispatch({ type: "ADD_QUESTION", question });
      })
      .catch((err) => {
        dispatch({ type: "ADD_QUESTION_ERROR", err });
      });
  };
};
