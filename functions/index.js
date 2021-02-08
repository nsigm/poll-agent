const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const FieldValue = admin.firestore.FieldValue;
const moment = require("moment");

// Pushes initial questions to users whenever a poll gets created
exports.initializePoll = functions.firestore
  .document("polls/{poll}")
  .onCreate((poll) => {
    var pollData = poll.data();
    var todayDate = moment().startOf("day");
    var pollDate = moment(pollData.date.toDate());
    if (todayDate.isAfter(pollDate, "day")) {
      return pushQuestions(pollData);
    } else {
      console.log(pollData.title + " is starting on a later date.");
    }
  });

// Pushes initial boosts for created cycle to users whenever a cycle gets created
exports.initializeCycle = functions.firestore
  .document("cycles/{cycle}")
  .onCreate((cycle) => {
    var cycleData = cycle.data();
    var todayDate = moment().startOf("day");
    var cycleDate = moment(pollData.date.toDate());
    if (todayDate.isAfter(cycleDate, "day")) {
      return pushQuestions(cycleData);
    } else {
      console.log(cycleData.title + " is starting on a later date.");
    }
  });

// Cron job that runs once a day at 12 PM CEST pushing new questions to users if there is a poll scheduled
exports.pollCron = functions.pubsub
  .schedule("0 12 * * *")
  .timeZone("Europe/Berlin") // uses tz database for world time zones
  .onRun((context) => {
    const pollsRef = admin.firestore().collection("polls");
    pollsRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var pollData = doc.data();
        var pollDate = moment(pollData.date.toDate());
        var pollTitle = pollData.title;
        var pollStatus = pollData.active;
        var pollFrequency = pollData.frequency;
        var todayDate = moment().startOf("day");
        if (pollStatus) {
          switch (pollFrequency) {
            case "Daily":
              if (todayDate.isAfter(pollDate, "day")) {
                pushQuestions(pollData);
              } else {
                console.log(pollTitle + " is scheduled for tomorrow.");
              }
              break;
            case "Weekly":
              if (todayDate.isAfter(pollDate, "week")) {
                pushQuestions(pollData);
              } else {
                console.log(pollTitle + " is scheduled for next week.");
              }
              break;
            case "Monthly":
              if (todayDate.isAfter(pollDate, "month")) {
                pushQuestions(pollData);
              } else {
                console.log(pollTitle + " is scheduled for next month.");
              }
              break;
            default:
              return console.log("Default.");
          }
        }
      });
    });
    return true;
  });

// Cron job that runs once a day at 12 PM CEST pushing new boosts to users if there is a cycle scheduled
exports.cycleCron = functions.pubsub
  .schedule("0 12 * * *")
  .timeZone("Europe/Berlin") // uses tz database for world time zones
  .onRun((context) => {
    const cyclesRef = admin.firestore().collection("cycles");
    cyclesRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var cycleData = doc.data();
        var cycleDate = moment(cycleData.date.toDate());
        var cycleTitle = cycleData.title;
        var cycleStatus = cycleData.active;
        var cycleFrequency = cycleData.frequency;
        var todayDate = moment().startOf("day");

        if(cycleStatus) {
          switch (cycleFrequency) {
            case "Daily":
              if (todayDate.isAfter(cycleDate, "day")) {
                if (cycleStatus) pushBoosts(cycleData);
              } else {
                console.log(cycleTitle + " is scheduled for tomorrow.");
              }
              break;
            case "Weekly":
              if (todayDate.isAfter(cycleDate, "week")) {
                if (cycleStatus) pushBoosts(cycleData);
              } else {
                console.log(cycleTitle + " is scheduled for next week.");
              }
              break;
            case "Monthly":
              if (todayDate.isAfter(cycleDate, "month")) {
                if (cycleStatus) pushBoosts(cycleData);
              } else {
                console.log(cycleTitle + " is scheduled for next month.");
              }
              break;
            default:
              return console.log("Default.");
          }
        }
      });
    });
    return true;
  });

// pushes relevant questions to users questionsWaiting in user profile
const pushQuestions = (pollData) => {
  return pollData.indicators.map((pollIndicator) => {
    admin
      .firestore()
      .collection("indicators")
      .doc(pollIndicator)
      .get()
      .then((doc) => {
        const pollsRef = admin.firestore().collection("polls");
        const usersRef = admin.firestore().collection("users");
        var pollUsers = pollData.users;
        var questionLimit = pollData.limit;
        var questions = [];
        var indicatorData = doc.data();
        var newDate = FieldValue.serverTimestamp();
        questions = indicatorData.questions;
        // ES6 Version of Durstenfeld Shuffle Algorithm adapted from ashleedawg on stackoverflow:
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        questions.map((question, index) => {
          if (index <= questionLimit - 1) {
            question = {
              ...question,
              kpi: pollIndicator,
            };
            pollUsers.map((user) => {
              usersRef
                .doc(user)
                .update({
                  questionsWaiting: FieldValue.arrayUnion(question),
                })
                .then((doc) =>
                  console.log(
                    "### " +
                      questions.length +
                      "Questions added for " +
                      user +
                      ".",
                    doc
                  )
                );
            });
          }
        });
        pollsRef.doc(pollData.title).update({
          date: newDate,
        });
      });
  });
};

// pushes boost object that contains available indicators and users to boostsWaiting in user profile
const pushBoosts = (cycleData) => {
  return cycleData.users.map((user) => {
    const cyclesRef = admin.firestore().collection("cycles");
    const usersRef = admin.firestore().collection("users");
    // ES6 Version from SidOfc on Stackoverflow https://stackoverflow.com/a/20827100
    var filteredUsers = cycleData.users.filter((e) => e !== user);
    var newDate = FieldValue.serverTimestamp();
    filteredUsers.map((boostUser) => {
      var boostObject = {
        boostUser: boostUser,
        boostIndicators: cycleData.indicators,
      };
      usersRef
        .doc(user)
        .update({
          boostsWaiting: FieldValue.arrayUnion(boostObject),
        })
        .then((doc) =>
          console.log("### Boost Cycle pushed to " + user + ".", doc)
        );
    });
    cyclesRef.doc(cycleData.title).update({
      date: newDate,
    });
  });
};

// Pushes answered Poll questions to user and collects KPI data
exports.processPoll = functions.firestore
  .document("users/{userId}")
  .onUpdate((doc) => {
    const usersRef = admin.firestore().collection("users");
    const user = doc.after.data();

    // stores the answered questions which triggered the function
    var answeredQuestions = user.questionsAnswered
      ? user.questionsAnswered
      : [];

    // if triggered by something else just return
    if (answeredQuestions.length > 0) {
      // stores the results of old polls
      var pollResults = user.pollResults ? user.pollResults : [];

      // maps through answered question objects to pick out relevant data from each
      answeredQuestions.map((question) => {
        var questionIndicator = question.kpi;
        var questionAnswer = question.answer;
        var question = question.question;
        //  TO-DO: Implement trust factor if answer is undefined or skipped

        if (pollResults.length > 0) {
          // returns true if indicator is already in pollResults
          // ES6 solution adapted from rujmah on stackoverflow https://stackoverflow.com/a/38500417
          let resultObject = pollResults.find(
            (object) => object.indicator === questionIndicator
          );
          if (resultObject) {
            // maps through users poll results to be able to insert new data into indicator objects
            pollResults.find((results, index) => {
              // if we are in the object for our current question indicator
              if (results.indicator === questionIndicator) {
                // stores old answers in results as array
                var oldAnswers = results.values;
                var oldQuestions = results.questions;
                // checks if there are answers to this specific indicator
                if (oldAnswers.length > 0) {
                  // creates new array from old answers
                  var newAnswers = [...oldAnswers, questionAnswer];
                  var newQuestions = [...oldQuestions, question];
                  // inserts new object into pollResults array at the correct index including new answers
                  pollResults[index] = {
                    indicator: questionIndicator,
                    values: newAnswers,
                    questions: newQuestions,
                  };
                }
              }
            });
            // if there is no object for our current question indicator yet
          } else {
            pollResults.push({
              indicator: questionIndicator,
              values: [questionAnswer],
              questions: [question],
            });
          }
          // if there are no pollResults at all
        } else {
          pollResults.push({
            indicator: questionIndicator,
            values: [questionAnswer],
            questions: [question],
          });
        }
      });
      // update user document with new pollResults and reset the answered questions
      usersRef
        .doc(user.uid)
        .update({
          questionsAnswered: [],
          pollResults: pollResults,
        })
        .then((doc) =>
          console.log(
            "### " + pollResults.length + " KPI values in total for user" + doc
          )
        );
    }
    return true;
  });

// Processes boosts and generates KPI data
exports.processBoost = functions.firestore
  .document("users/{userId}")
  .onUpdate((doc) => {
    const usersRef = admin.firestore().collection("users");
    const user = doc.after.data();

    // stores the received boosts which triggered the function
    var boostsReceived = user.boostsReceived ? user.boostsReceived : [];

    // if triggered by something else just return
    if (boostsReceived.length > 0) {
      // stores the results of old polls
      var pollResults = user.pollResults ? user.pollResults : [];

      // maps through answered question objects to pick out relevant data from each
      boostsReceived.map((indicator) => {
        if (pollResults.length > 0) {
          // ES6 solution adapted from rujmah on stackoverflow https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
          let resultObject = pollResults.find(
            (object) => object.indicator === indicator
          );
          if (resultObject) {
            // maps through users poll results to be able to insert new data into indicator objects
            pollResults.find((results, index) => {
              // if we are in the object for our current question indicator
              if (results.indicator === indicator) {
                // stores old answers in results as array
                var oldAnswers = results.values;
                var oldQuestions = results.questions;
                // checks if there are answers to this specific indicator
                if (oldAnswers.length > 0) {
                  // creates new array from old answers
                  var newAnswers = [...oldAnswers, "10"];
                  var newQuestions = [...oldQuestions, "boost"];
                  // inserts new object into pollResults array at the correct index including new answers
                  pollResults[index] = {
                    indicator: indicator,
                    values: newAnswers,
                    questions: newQuestions,
                  };
                }
              }
            });
            // if there is no object for our current indicator yet
          } else {
            pollResults.push({
              indicator: indicator,
              values: ["10"],
              questions: ["boost"],
            });
          }
          // if there are no pollResults at all
        } else {
          pollResults.push({
            indicator: indicator,
            values: ["10"],
            questions: ["boost"],
          });
        }
      });
      // update user document with new pollResults and reset the receivedBoosts
      usersRef
        .doc(user.uid)
        .update({
          boostsReceived: [],
          pollResults: pollResults,
        })
        .then((doc) =>
          console.log(
            "### " + pollResults.length + " KPI values in total for user" + doc
          )
        );
    }
    return true;
  });
