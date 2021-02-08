export const createPoll = (poll) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    poll.users.map((uid) => {
      return firestore
        .collection("users")
        .doc(uid)
        .update({
          polls: firebase.firestore.FieldValue.arrayUnion(poll.title),
        });
    });
    firestore
      .collection("polls")
      .doc(poll.title)
      .set({
        ...poll,
        usage: 0,
        trust: 100,
        active: true,
      })
      .then(() => {
        dispatch({ type: "CREATE_POLL", poll });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_POLL_ERROR", err });
      });
  };
};

export const deletePoll = (poll) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("polls")
      .doc(poll)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_POLL", poll });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_POLL_ERROR", err });
      });
  };
};

export const disablePoll = (poll) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    if (poll.active === true) {
      firestore
        .collection("polls")
        .doc(poll.title)
        .update({
          active: false,
        })
        .then(() => {
          dispatch({ type: "DISABLE_POLL", poll });
        })
        .catch((err) => {
          dispatch({ type: "DISABLE_POLL_ERROR", err });
        });
    } else if (poll.active === false) {
      console.log(poll.title);
      firestore
        .collection("polls")
        .doc(poll.title)
        .update({
          active: true,
        })
        .then(() => {
          dispatch({ type: "DISABLE_POLL", poll });
        })
        .catch((err) => {
          dispatch({ type: "DISABLE_POLL_ERROR", err });
        });
    }
  };
};

export const submitPoll = (answers, questions, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    questions.map((question, questionIndex) => {
      answers.map((value, answerIndex) => {
        if(questionIndex === answerIndex) {
          questions[questionIndex].answer = value;         
        }
      })
    });

    firestore
    .collection("users")
    .doc(uid)
    .update({
      questionsAnswered: questions,
      questionsWaiting: null
    });
  };
};
