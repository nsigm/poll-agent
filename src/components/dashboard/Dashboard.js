/**
 * Dashboard.js Component
 * Renders and implements landing page for logged in users and pulls relevant collections from Firebase
 * into front-end for providing information about recent happenings in the application.
 *
 * @public
 */

import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../config/fbConfig";
import { Pie } from "react-chartjs-2";

class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      pollResults: [],
      pieChartData: {},
    };
  }

  componentDidMount() {
    this.fetchUserAverages();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchUserAverages() {
    var usersRef = firebase.firestore().collection("users");
    var companyResults = [];
    usersRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var user = doc.data();
        var pollResults = user.pollResults;
        if (pollResults && pollResults.length > 0) {
          pollResults.forEach((result, i) => {
            var numberValues = result.values.map((i) => Number(i)); // Adapted from Q10Viking on https://stackoverflow.com/a/58833088
            const avg =
              numberValues.reduce((sum, curr) => sum + curr, 0) /
              numberValues.length; // Adapted from Tomasz Mularczyk on https://stackoverflow.com/a/51750950
            console.log(numberValues)
            if (companyResults[i]) {
                companyResults[i] = {
                  indicator: result.indicator,
                  values: [avg],
                };
            } else {
              companyResults.push({ indicator: result.indicator, avg: avg });
            }
          });
        }
      });
      var pieChartData = [];
      var pieChartLabels = [];
      companyResults.map((result) => {
        var numberValues = result.values.map((i) => Number(i));
        const avg =
          numberValues.reduce((sum, curr) => sum + curr, 0) /
          numberValues.length; // Adapted from Tomasz Mularczyk on https://stackoverflow.com/a/51750950
        pieChartData.push(avg);
        console.log(avg + " " + result.indicator)
        pieChartLabels.push(result.indicator);
      });
      // Colors in data variable are adapted from user HimBromBeere: https://forums.pentaho.com/threads/129445-Bar-Chart-Colors/
      var data = {
        datasets: [
          {
            data: pieChartData,
            backgroundColor: [
              "#336699",
              "#99CCFF",
              "#999933",
              "#666699",
              "#CC9933",
              "#006666",
              "#3399FF",
              "#993300",
            ],
            hoverBackgroundColor: [
              "#336699",
              "#99CCFF",
              "#999933",
              "#666699",
              "#CC9933",
              "#006666",
              "#3399FF",
              "#993300",
            ],
          },
        ],
        labels: pieChartLabels,
      };
      console.log(data);
      this.setState({
        companyResults: companyResults,
        pieChartData: data,
      });
    });
  }

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/landing-page" />;

    const { pieChartData } = this.state;
    return (
      <Wrapper>
        <Box style={{ width: "90%" }}>
          <H1>Welcome, great to see you {profile.firstName}!</H1>
        </Box>
        <Box style={{ marginTop: "1em" }}>
          <H1 style={{ marginBottom: "1em" }}>
            How balanced is {profile.organizationName}? (Click indicators for
            comparison)
          </H1>
          <Pie
            data={pieChartData}
            height={18}
            width={18}
            options={{
              legend: { labels: { fontColor: "white", fontSize: 14 } },
            }}
          />
        </Box>
        <Box style={{ marginTop: "1em", width: "90%" }}>
          <H1 style={{ marginBottom: "1em" }}>
            {" "}
            You are currently assigned to{" "}
            {profile.polls && profile.polls.length} Polls and{" "}
            {profile.cycles ? profile.cycles.length : "0"} Feedback Cycles.
          </H1>
        </Box>

        <TrendWrapper></TrendWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  @media (max-width: 1335px) {
  }

  @media (max-width: 768px) {
    margin-top: 5.2em;
  }
`;

const Box = styled.div`
  position: relative;
  margin: auto;
  display: inline-block;
  padding: 2rem;
  width: 28%;
  background: #2e355d;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border: 0;

  @media (max-width: 1335px) {
    width: 90%;
    padding: 1rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const H1 = styled.h1`
  position: relative;
  display: inline-block;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 2.5rem;
  margin: auto;
  font-weight: 300;
  color: #e1e2e1;

  @media (max-width: 768px) {
    margin: 0;
    font-size: 1.7rem;
  }
`;

const TrendWrapper = styled.div`
  position: relative;
  padding: 0 1em 0 1em;
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-flow: row;

  @media (max-width: 1585px) {
    display: block;
  }
`;

const mapStateToProps = (state) => {
  return {
    feedbacks: state.firestore.ordered.feedbacks,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.data.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([])
)(Dashboard);
