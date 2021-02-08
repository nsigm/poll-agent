/**
 * Profile.js is displaying each users results of polls and feedback cycles
 * in averages on a radar chart and trendlines.
 * It uses firebase auth profile data which is where the results from each user are stored.
 * @public
 */

import React, { Component } from "react";
import "react-dates/initialize";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import IndicatorSummary from "./IndicatorSummary";
import TrendWrapper from "../../styles/TrendWrapper";
import DataBox from "../../styles/DataBox";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
      role: this.props.profile.role,
      hobbies: [],
      description: "",
      expertise: [],
      joinedOrganizationAt: null,
    };
  }

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const pollResults = profile.pollResults;
    var radarLabels = [];
    var radarData = [];
    var indicatorBoosts = [];

    pollResults &&
      pollResults.map((result) => {

        var numberValues = result.values.map((i) => Number(i)); // Adapted from Q10Viking on https://stackoverflow.com/a/58833088
        const avg =
          numberValues.reduce((sum, curr) => sum + curr, 0) /
          numberValues.length; // Adapted from Tomasz Mularczyk on https://stackoverflow.com/a/51750950
        var boostAmount = 0;
        result.questions.map((content) => {
          console.log(content)
          if(content === "boost") {
            boostAmount += 1 
          }
        })
        radarLabels.push(result.indicator);
        radarData.push(avg.toFixed(2));
        indicatorBoosts.push(boostAmount);
      });

    const RadarData = {
      labels: radarLabels,
      datasets: [
        {
          label: "Average",
          backgroundColor: "rgba(30, 132, 127, .2)",
          borderColor: "#cfa62c",
          pointBackgroundColor: "#cfa62c",
          poingBorderColor: "#fff",

          data: radarData,
        },
      ],
    };
    const RadarOptions = {
      scale: {
        ticks: {
          min: 0,
          max: 10,
          stepSize: 1,
          backdropColor: "#2e355d",
          fontColor: "#e1e2e1",
          fontSize: 15,
        },
        angleLines: {
          color: "#e1e2e1",
          lineWidth: 2,
        },
        gridLines: {
          color: "#e1e2e1",
          circular: true,
        },
        pointLabels: {
          fontColor: "#e1e2e1",
          fontSize: 16,
        },
      },
      legend: {
        labels: {
          fontColor: "#e1e2e1",
          fontSize: 20,
        },
      },
    };

    return (
      <Wrapper>
        <TrendWrapper>
          {pollResults &&
            pollResults.map((result, i) => {
              return (
                <div>
                <IndicatorSummary
                  values={result.values}
                  indicator={result.indicator}
                  boosts={indicatorBoosts[i]}
                />
                </div>
              );
            })}
        </TrendWrapper>
        <TrendWrapper>
          <DataBox>
            <Radar
              data={RadarData}
              options={RadarOptions}
              height={28}
              width={28}
            />
          </DataBox>
        </TrendWrapper>
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
)(Profile);
