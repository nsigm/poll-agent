/**
 * CreateCycle.js Component
 * Provides forms and functionality for managing cycles.
 * 
 * @public
 */

import React, { Component } from "react";
import "react-dates/initialize";
import {
  createCycle,
  deleteCycle,
  disableCycle,
} from "../../store/actions/cycleActions";
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

class CreateCycle extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    const dateDefault = moment().toDate();
    this.state = {
      title: "",
      indicators: null,
      cycles: null,
      userList: null,
      date: dateDefault,
      amountOfQuestions: "",
      frequencies: ["Daily", "Weekly", "Monhly"],
      cycleIndicators: [],
      cycleUsers: [],
      feedbackFrequency: "Daily",
    };
  }

  componentDidMount() {
    this.fetchIndicators();
    this.fetchUsers();
    this.fetchCycles();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleMultiSelect = (e) => {
    if (this.state.cycleIndicators.includes(e.target.value)) {
      var newIndicators = this.state.cycleIndicators.filter(
        (kpi) => kpi !== e.target.value
      );
      var stripped = newIndicators.filter((el) => el !== "");
      this.setState({
        cycleIndicators: stripped,
      });
    } else {
      this.setState({
        cycleIndicators: [...this.state.cycleIndicators, e.target.value],
      });
    }
  };

  handleUserSelect = (e) => {
    let target = e.target;
    let value = Array.from(target.selectedOptions, (option) => option.value);
    console.log(this.state.cycleUsers);
    this.setState({
      cycleUsers: [...this.state.cycleUsers, value[0]],
    });
  };

  handleCycleSubmit = (e) => {
    e.preventDefault();
    this.props.createCycle({
      title: this.state.title,
      users: this.state.cycleUsers,
      indicators: this.state.cycleIndicators,
      date: this.state.date,
      frequency: this.state.feedbackFrequency,
    });
    this.props.history.push("/create-cycle");
  };

  handleDisable = (e, cycle) => {
    e.preventDefault();
    this.props.disableCycle(cycle);
    this.props.history.push("/create-cycle");
  };

  handleDelete = (e, cycle) => {
    e.preventDefault();
    this.props.deleteCycle(cycle);
    this.props.history.push("/create-cycle");
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

  fetchCycles() {
    var cyclesRef = firebase.firestore().collection("cycles");
    var cycles = [];
    cyclesRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var cycle = doc.data();
        cycles.push({
          title: cycle.title,
          date: cycle.date.toDate().toDateString(),
          indicators: cycle.indicators,
          frequency: cycle.frequency,
          trust: cycle.trust,
          active: cycle.active,
        });
      });
      this.setState({
        cycles: cycles,
      });
    });
  }

  render() {
    const { auth } = this.props;
    const datePlaceholder = moment().format("DD MMMM, YYYY");
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <AdminWrapper>
        <FormBox onSubmit={this.handleCycleSubmit}>
          <H3>Create Feedback Cycle</H3>
          <InputWrapper className="input-field" style={{ width: "100%" }}>
            <InputLabel htmlFor="text">Title for the Cycle</InputLabel>
            <InputStyled type="text" id="title" onChange={this.handleChange} />
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
              id="feedbackFrequency"
              type="select"
              label="Frequency"
              value={this.state.feedbackFrequency}
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
            {this.state.userList && (
              <Input
                id="users"
                type="select"
                label="Users"
                value={this.state.userList}
                onChange={this.handleUserSelect}
                multiple={true}
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
          <ButtonWrapper>
            <ButtonStyled className="btn waves-effect ">Start</ButtonStyled>
          </ButtonWrapper>
        </FormBox>
        <FormBox>
          <H3>Running Feedback Cycles</H3>
          <Table style={{ margin: "20px" }}>
            <thead>
              <tr>
                <TableColumn>Name</TableColumn>
                <TableColumn>Indicators</TableColumn>
                <TableColumn>Actions</TableColumn>
              </tr>
            </thead>
            <tbody>
              {this.state.cycles &&
                this.state.cycles.map((cycle, i) => (
                  <TableRow key={i} value={cycle}>
                    <TableCell>{cycle.title} ({cycle.frequency})</TableCell>
                    <TableCell>
                      {cycle.indicators.map((cycle) => cycle + ", ")}
                    </TableCell>
                    <TableCell>
                      <ButtonStyledRed
                        className="btn waves-effect "
                        onClick={(e) => this.handleDelete(e, cycle.title)}
                      >
                        Delete
                      </ButtonStyledRed>
                      {cycle.active ? (
                        <ButtonStyledRed
                          className="btn waves-effect"
                          onClick={(e) => this.handleDisable(e, cycle)}
                        >
                          Disable
                        </ButtonStyledRed>
                      ) : (
                        <ButtonStyled
                          className="btn waves-effect"
                          onClick={(e) => this.handleDisable(e, cycle)}
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
    createCycle: (cycle) => dispatch(createCycle(cycle)),
    deleteCycle: (cycle) => dispatch(deleteCycle(cycle)),
    disableCycle: (cycle) => dispatch(disableCycle(cycle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCycle);
