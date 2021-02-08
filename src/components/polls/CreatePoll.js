/**
 * CreatePoll.js Component
 * Provides forms and functionality for managing polls.
 * 
 * @public
 */


import React, { Component } from "react";
import {
  createPoll,
  deletePoll,
  disablePoll,
} from "../../store/actions/pollActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Table, Input } from "react-materialize";
import * as moment from "moment";
import firebase from "../../config/fbConfig";
import styled from "styled-components";
import FormBox from "../../styles/FormBox.js";
import InputWrapper from "../../styles/InputWrapper.js";
import InputLabel from "../../styles/InputLabel.js";
import InputStyled from "../../styles/InputStyled.js";
import ButtonStyled from "../../styles/ButtonStyled.js";
import AdminWrapper from "../../styles/AdminWrapper.js";

class CreatePoll extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    const dateDefault = moment().toDate();
    this.state = {
      title: "",
      indicators: null,
      polls: null,
      userList: null,
      date: dateDefault,
      questionsPerIndicator: [1, 2, 5, 10],
      frequencies: ["Daily", "Weekly", "Monhly"],
      pollIndicators: [],
      pollUsers: [],
      pollFrequency: "Daily",
      limit: 1
    };
  }

  componentDidMount() {
    this.fetchIndicators();
    this.fetchUsers();
    this.fetchPolls();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleMultiSelect = (e) => {
    if (this.state.pollIndicators.includes(e.target.value)) {
      var newIndicators = this.state.pollIndicators.filter(
        (kpi) => kpi !== e.target.value
      );
      var stripped = newIndicators.filter((el) => el !== "");
      this.setState({
        pollIndicators: stripped,
      });
    } else {
      this.setState({
        pollIndicators: [...this.state.pollIndicators, e.target.value],
      });
    }
  };

  handleUserSelect = (e) => {
    let target = e.target;
    let value = Array.from(target.selectedOptions, (option) => option.value);
    this.setState({
      pollUsers: [...this.state.pollUsers, value[0]],
    });
  };

  handlePollSubmit = (e) => {
    e.preventDefault();
    this.props.createPoll({
      title: this.state.title,
      users: this.state.pollUsers,
      indicators: this.state.pollIndicators,
      date: this.state.date,
      frequency: this.state.pollFrequency,
      limit: this.state.limit
    });
    this.props.history.push("/create-poll");
  };

  handleDisable = (e, poll) => {
    e.preventDefault();
    this.props.disablePoll(poll);
    this.props.history.push("/create-poll");
  };

  handleDelete = (e, poll) => {
    e.preventDefault();
    this.props.deletePoll(poll);
    this.props.history.push("/create-poll");
  };

  handleDateChange = (e) => {
    var date = e.target.value;
    var defaultDate = this.dateDefault;
    date = moment(date).set({
      millisecond: moment(defaultDate).millisecond(),
      second: moment(defaultDate).second(),
      minute: moment(defaultDate).minute(),
      hour: moment(defaultDate).hour(),
      date: moment(date).date(),
      month: moment(date).month(),
      year: moment(date).year(),
    });
    this.setState({
      [e.target.id]: moment(date).toDate(),
    });
  };

  fetchUsers() {
    const { auth } = this.props;
    var usersRef = firebase.firestore().collection("users");
    var userList = [];
    usersRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var user = doc.data();
        if (doc.id !== auth.uid) {
          userList.push(user);
        }
      });
      this.setState({
        userList: userList,
      });
    });
  }

  fetchIndicators() {
    var indicatorsRef = firebase.firestore().collection("indicators");
    var indicators = [];
    indicatorsRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var kpi = doc.data();
        indicators.push({
          name: kpi.name,
          value: kpi.name,
        });
      });
      this.setState({
        indicators: indicators,
      });
    });
  }

  fetchPolls() {
    var pollsRef = firebase.firestore().collection("polls");
    var polls = [];
    pollsRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var poll = doc.data();
        polls.push({
          title: poll.title,
          date: poll.date.toDate().toDateString(),
          indicators: poll.indicators,
          frequency: poll.frequency,
          trust: poll.trust,
          active: poll.active,
        });
      });
      this.setState({
        polls: polls,
      });
    });
  }

  render() {
    const { auth } = this.props;
    const datePlaceholder = moment().format("DD MMMM, YYYY");
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <AdminWrapper>
        <FormBox onSubmit={this.handlePollSubmit}>
          <H3>Create Poll</H3>
          <InputWrapper className="input-field" style={{ width: "100%" }}>
            <InputLabel htmlFor="text">Title for the Poll</InputLabel>
            <InputStyled type="text" id="title" onChange={this.handleChange} />
            {this.state.userList && (
              <Input
                id="users"
                type="select"
                label="Users"
                value={this.state.userList}
                multiple={true}
                onChange={this.handleUserSelect}
              >
                {this.state.userList.map((user, i) => {
                  return (
                    <option key={i} value={user.uid}>
                      {user.firstName}
                    </option>
                  );
                })}
              </Input>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              id="date"
              placeholder={datePlaceholder}
              label="Start Date"
              max="true"
              name="on"
              type="date"
              onChange={this.handleDateChange}
            />
            {this.state.indicators && (
              <Input
                id="indicators"
                type="select"
                label="Indicators"
                value={this.state.indicators}
                multiple={true}
                onChange={this.handleMultiSelect}
              >
                {this.state.indicators.map((kpi, i) => {
                  return (
                    <option key={i} value={kpi.name}>
                      {kpi.name}
                    </option>
                  );
                })}
              </Input>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              id="pollFrequency"
              type="select"
              label="Frequency"
              onChange={this.handleChange}
            >
              {this.state.frequencies.map((value, i) => {
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              })}
            </Input>
            <Input
              id="limit"
              type="select"
              label="Questions"
              onChange={this.handleChange}
            >
              {this.state.questionsPerIndicator.map((value, i) => {
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              })}
            </Input>
          </InputWrapper>
          <ButtonWrapper>
            <ButtonStyled className="btn waves-effect ">Start</ButtonStyled>
          </ButtonWrapper>
        </FormBox>
        <FormBox>
          <H3>Running Polls</H3>
          <Table style={{ margin: "20px" }}>
            <thead>
              <tr>
                <TableColumn>Name</TableColumn>
                <TableColumn>Indicators</TableColumn>
                <TableColumn>Actions</TableColumn>
              </tr>
            </thead>
            <tbody>
              {this.state.polls &&
                this.state.polls.map((poll, i) => (
                  <TableRow key={i} value={poll}>
                    <TableCell>{poll.title} ({poll.frequency})</TableCell>
                    <TableCell>
                      {poll.indicators.map((poll) => poll + ", ")}
                    </TableCell>
                    <TableCell>
                      <ButtonStyledRed
                        className="btn waves-effect "
                        onClick={(e) => this.handleDelete(e, poll.title)}
                      >
                        Delete
                      </ButtonStyledRed>
                      {poll.active ? (
                        <ButtonStyledRed
                          className="btn waves-effect"
                          onClick={(e) => this.handleDisable(e, poll)}
                        >
                          Disable
                        </ButtonStyledRed>
                      ) : (
                        <ButtonStyled
                          className="btn waves-effect"
                          onClick={(e) => this.handleDisable(e, poll)}
                        >
                          Activate
                        </ButtonStyled>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </tbody>
          </Table>
        </FormBox>
      </AdminWrapper>
    );
  }
}


const H3 = styled.h3`
  margin: auto;
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 1.8rem;
  font-weight: 300;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const ButtonStyledRed = styled(ButtonStyled)`
  &:hover {
    background: #f64c72 !important;
  }
`;

const TableColumn = styled.th`
  padding: 10px 5px;
`;

const TableRow = styled.tr`
  border-bottom: 0.5px solid grey !importaFnt;

  @media (max-width: 768px) {
  }
`;

const TableCell = styled.td``;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (poll) => dispatch(createPoll(poll)),
    deletePoll: (poll) => dispatch(deletePoll(poll)),
    disablePoll: (poll) => dispatch(disablePoll(poll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
