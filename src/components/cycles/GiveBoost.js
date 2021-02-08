/**
 * GiveBoost.js is a dynamic and responsive slider range input form component
 * that makes it possible to boost other users indicators and triggers firebase
 * cloud functions to update user KPI data in the database.
 *
 * @public
 */

import React, { Component } from "react";
import "react-dates/initialize";
import { submitBoosts } from "../../store/actions/cycleActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "../../config/fbConfig";
import styled from "styled-components";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./GiveBoost.css";
import Feelings from "../../res/feelings.png";
import { Input } from "react-materialize";

class GiveBoost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorsChosen: [],
      userArray: null,
    };
  }

  componentDidMount() {
    this.fetchUserNames();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSelect = (e, index) => {
    e.preventDefault();
    var indicators = this.state.indicatorsChosen;
    indicators[index] = e.target.value;
    this.setState({
      indicatorsChosen: indicators,
    });
  };

  fetchUserNames() {
    var userArray = [];
    const { profile } = this.props;
    const usersRef = firebase.firestore().collection("users");
    var filteredUsers = profile.boostsWaiting;
    filteredUsers &&
      filteredUsers.map((user) => {
        usersRef
          .doc(user.boostUser)
          .get()
          .then(function (doc) {
            var userData = doc.data();
            var name = userData.firstName + " " + userData.lastName;
            var userObject = { name: name, uid: user };
            userArray.push(userObject);
          });
      });
    this.setState({
      userArray: userArray,
    });
  }

  handleSubmit = (e, uid) => {
    e.preventDefault();

    this.props.submitBoosts(this.state.indicatorsChosen, this.state.userArray, uid);
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const usersWaiting = profile.boostsWaiting;
    const users = this.state.userArray;
    if (usersWaiting && users)
      return (
        <Wrapper>
          <Slider className="slider-wrapper">
            {usersWaiting &&
              usersWaiting.map((boost, index) => (
                <div
                  key={index}
                  className="slider-content"
                  style={{ background: "#2e355d" }}
                >
                  <H2>
                    Boost {index + 1} of {usersWaiting.length}
                  </H2>

                    <span style={{ transition: "none", transform: "unset"}}>
                      <H2 className="kpi">
                        {users &&
                          users.map((user, i) => {
                            if (index === i) {
                              return <div key={i}>{user.name}</div>;
                            }
                          }) }
                      </H2>
                    </span>
    
                  <Button
                    className="btn waves-effect "
                    onClick={(e) => this.handleSubmit(e, auth.uid)}
                  >
                    Submit Boosts
                  </Button>
                  <div className="inner">
                         
                  <img
                  src={Feelings}
                  alt="icon"
                  width="80"
                  height="80"
                  style={{ margin: "auto", width: "100"}}
                ></img>
                    <H3>Select which area you appreciate the most:</H3>

                    <Input
                      id="indicators"
                      type="select"
                      label="Indicators"
                      defaultValue="0"
                      onChange={(e) => this.handleSelect(e, index)}
                    >
                      {boost.boostIndicators.map((indicator, i) => {
                        return (
                          <option key={i} value={indicator}>
                            {indicator}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              ))}
          </Slider>
        </Wrapper>
      );

    return (
      <Wrapper>
        <Box>
          <H1>No available boosts, please check back tomorrow at 13pm.</H1>
        </Box>
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

  .select-wrapper {
    margin-top: 8em;
    input.select-dropdown {
      background-color: #e1e2e1 !important;
      width: 50% !important;
      margin: auto !important;
    }
    span.caret {
      right: 27% !important;
      z-index: 20;
      font-size: 1.3rem;
      color: black;
      cursor: pointer;
    }
    .dropdown-content {
      margin-left: 25%;
    }
    &:hover {
      span.caret {
        color: #1e847f;
      }
      input.select-dropdown {
        background-color: #e1e2e1 !important;
      }
    }
  }

  .input-field.col label {
    left: 25%;
    font-size: 1.3rem;
    margin-top: -1em;
    display: none;
    @media (max-width: 768px) {
      color: #e1e2e1;
    }
  }

  .slider-content section {
   left: 0 !important;
   width: 100%;
   top: 70vh;
   z-index: 5;
  }

  .slider-content .inner {
    @media (max-width: 768px) {
      top: 60%;
    }
  
  }
`;

const Box = styled.form`
  position: relative;
  margin: auto;
  padding: 3rem;
  width: 80%;
  display: flex;
  flex-shrink: 0;
  flex-flow: row wrap;
  background: #2e355d;
  /* From: https://boxshadows.nakulrathore.com/ */
  box-shadow: 0 6px 6px rgba(10, 16, 20, 0.15), 0 0 52px rgba(10, 16, 20, 0.12);
  border: 0;

  @media (max-width: 1335px) {
    width: 100%;
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
  }
`;

const H2 = styled.h2`
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 2rem;
  font-weight: 300;
  margin: 1em 0;
  color: #e1e2e1;
  &:last-of-type {
    margin-top: 2.5em;
  }
  &.kpi {
    margin-top: -0.5em;
  }
  @media (max-width: 1335px) {
    &:last-of-type {
      margin-top: 5.5em;
    }
  }

  @media (max-width: 768px) {
    margin: 2em 0;
    &:last-of-type {
      margin-top: 3.5em;
    }
  }
`;

const H3 = styled.h4`
  margin: auto;
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: -3em;
  color: black;

  @media (max-width: 1335px) {
    font-size: 1.5rem;
    margin-bottom: -5em;
    color: black;
  }

  @media (max-width: 769px) {
    margin-top: 1em;
    color: #e1e2e1;

  }
`;

const Button = styled.button`
  padding: 0 2em;
  font-size: 1.2rem;
  background: #e1e2e1 !important;
  color: #1e847f;
  /* From: https://boxshadows.nakulrathore.com/ */
  box-shadow: 0 6px 6px rgba(10, 16, 20, 0.15), 0 0 52px rgba(10, 16, 20, 0.12);
  border: 0;
  z-index: 0;

  &:hover {
    background: #1e847f !important;
    color: #e1e2e1 !important;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2em;
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.data.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitBoosts: (indicators, users, uid) =>
      dispatch(submitBoosts(indicators, users, uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiveBoost);
