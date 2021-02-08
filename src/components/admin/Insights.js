/**
 * Insights.js is displaying all users results of polls and feedback cycles and their trend lines.
 * It uses  data which is where the results from each user are stored.
 * 
 * @public
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Table } from "react-materialize";
import firebase from "../../config/fbConfig";
import Trend from "react-trend";
import styled from "styled-components";
import FormBox from "../../styles/FormBox";

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAverages: [],
      userNames: [],
      userIndicators: [],
      allUsersResults: [],
      boosts: [],
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    var usersRef = firebase.firestore().collection("users");
    var averages = [];
    var indicators = [];
    var names = [];
    var results = [];
    var totalAverages = [];
    var boosts = [];
    var userQuestions = [];
    usersRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var userAverages = [];
        var userIndicators = [];
        var userResults = [];
        var indicatorBoosts = [];
        var amountOfQuestions = [];
        var user = doc.data();
        var name = user.firstName + " " + user.lastName;
        var pollResults = user.pollResults;
        var sortedPollResults =
          pollResults &&
          pollResults.sort((a, b) => a.indicator.localeCompare(b.indicator)); // Adapted from Vlad Bezden on https://stackoverflow.com/a/35092754
        sortedPollResults &&
          sortedPollResults.map((result) => {
            var numberValues = result.values;
            if (numberValues.length < 2) numberValues.push(numberValues[0]); // in case there is only 1 value for an indicator to show static trend line
            numberValues = numberValues.map((i) => Number(i)); // Adapted from Q10Viking on https://stackoverflow.com/a/58833088
            const avg =
              numberValues.reduce((sum, curr) => sum + curr, 0) /
              numberValues.length;
            var boostAmount = 0;

            result.questions.map((content) => {
              if (content === "boost") {
                boostAmount += 1;
                console.log(content);
              }
            });
            var questionAmount = numberValues.length - boostAmount;
            userIndicators.push(result.indicator);
            userAverages.push(avg.toFixed(2)); // Adapted from A Kunin on  https://stackoverflow.com/a/12830454
            userResults.push(numberValues);
            if (boostAmount > 0) {
              indicatorBoosts.push(boostAmount);
            } else {
              indicatorBoosts.push(0);
            }
            amountOfQuestions.push(questionAmount);
          });

        var numberUserAverages = userAverages.map((i) => Number(i));

        names.push(name);
        averages.push(numberUserAverages);
        const totalAvg =
          numberUserAverages.reduce((sum, curr) => sum + curr, 0) /
          numberUserAverages.length; // Adapted from Tomasz Mularczyk on https://stackoverflow.com/a/51750950
        if (indicatorBoosts.length) boosts.push(indicatorBoosts);
        indicators.push(userIndicators);
        results.push(userResults);
        totalAverages.push(totalAvg.toFixed(2));
        userQuestions.push(amountOfQuestions);
        console.log(indicatorBoosts);
        this.setState({
          userAverages: averages,
          userNames: names,
          userIndicators: indicators,
          allUsersResults: results,
          totalAverages: totalAverages,
          boosts: boosts,
          userQuestions: userQuestions,
        });
      });
    });
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/landing-page" />;

    const {
      boosts,
      userNames,
      userIndicators,
      allUsersResults,
      totalAverages,
      userQuestions,
    } = this.state;
    console.log(boosts);
    return (
      <Wrapper>
        <FormBox style={{ overflow: "auto" }}>
          <Table style={{ padding: "100px" }}>
            <thead>
              <tr>
                <TableColumn>Name</TableColumn>
                <TableColumn style={{ textAlign: "center" }}>Total</TableColumn>
                {userIndicators[0] &&
                  userIndicators[0].map((indicator, i) => {
                    return (
                      <TableColumn key={i} style={{ textAlign: "center" }}>
                        {indicator}
                      </TableColumn>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {allUsersResults &&
                allUsersResults.map((userResults, i) => (
                  <TableRow key={i}>
                    <TableCell>{userNames[i]}</TableCell>
                    <TableCell>
                      <TableStat>{totalAverages[i]} &empty;</TableStat>
                      <TableStat> {userQuestions[i] && userQuestions[i].reduce((sum, curr) => sum + curr, 0)-boosts[i].reduce((sum, curr) => sum + curr, 0)} Questions</TableStat>
                      <TableStat> {boosts[i] && boosts[i].reduce((sum, curr) => sum + curr, 0)} Boosts</TableStat>
                    </TableCell>
                    {userResults.length &&
                      userResults.map((indicatorResults, index) => {
                        return (
                          <TableCell key={index}>
                            {indicatorResults && indicatorResults.length ? (
                              <div>
                                <Trend
                                  smooth
                                  autoDraw
                                  autoDrawDuration={3000}
                                  autoDrawEasing="ease-out"
                                  data={indicatorResults}
                                  gradient={["#cfa62c", "#1e847f"]}
                                  radius={20}
                                  strokeWidth={15}
                                  strokeLinecap={"square"}
                                />
                                <TableStat>
                                  {(
                                    indicatorResults.reduce(
                                      // Adapted from Tomasz Mularczyk on https://stackoverflow.com/a/51750950
                                      (sum, curr) => sum + curr,
                                      0
                                    ) / indicatorResults.length
                                  ).toFixed(2)} &empty;
                                </TableStat>
                                <TableStat>{userQuestions[i][index]-boosts[i][index]} Questions</TableStat>
                                <TableStat>{boosts[i][index]} Boosts</TableStat>
                              </div>
                            ) : (
                              <p>None</p>
                            )}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                ))}
            </tbody>
          </Table>
        </FormBox>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 1em 2em;
  @media (max-width: 1335px) {
    padding: 5.5em 1em;
  }
  @media (max-width: 768px) {
  }
`;

const TableColumn = styled.th``;

const TableRow = styled.tr`
  border-bottom: 0.5px solid grey !important;

  @media (max-width: 768px) {
  }
`;

const TableCell = styled.td`
  min-width: 110px;
  text-algin: center;
  p {
    text-align: center;
  }
`;

const TableStat = styled.div`
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "users" }])
)(Insights);
