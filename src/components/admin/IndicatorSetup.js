/**
 * IndicatorSetup.js Component
 * Provides forms and functionality for managing key performance indicators and adding questions to them.
 * 
 * @public
 */


import React, { Component } from "react";
import {
  addIndicator,
  deleteIndicator,
  addQuestion,
} from "../../store/actions/adminActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Table, Input } from "react-materialize";
import firebase from "../../config/fbConfig";
import styled from "styled-components";
import FormBox from "../../styles/FormBox.js";
import InputWrapper from "../../styles/InputWrapper.js";
import InputLabel from "../../styles/InputLabel.js";
import InputStyled from "../../styles/InputStyled.js";
import ButtonStyled from "../../styles/ButtonStyled.js";

class IndicatorSetup extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      indicators: [],
      question: "",
      minValue: "",
      maxValue: "",
      kpi: "",
    };
  }

  componentDidMount() {
    this.fetchIndicators();
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addIndicator({ name: this.state.kpi });
    this.props.history.push("/indicator-setup");
  };

  handleSelect = (e) => {
    this.setState({
      kpi: e.target.value,
    });
  };

  handleQuestionSubmit = (e) => {
    e.preventDefault();
    this.props.addQuestion({
      question: this.state.question,
      minValue: this.state.minValue,
      maxValue: this.state.maxValue,
      kpi: this.state.kpi,
    });
    this.props.history.push("/indicator-setup");
  };

  handleDelete = (e, kpi) => {
    e.preventDefault();
    this.props.deleteIndicator(kpi);
  };

  fetchIndicators() {
    var indicatorsRef = firebase.firestore().collection("indicators");
    var indicators = [];
    indicatorsRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var kpi = doc.data();
        indicators.push({
          name: kpi.name,
          usage: kpi.usage,
          questions: kpi.questions,
          trust: kpi.trust,
        });
      });
      this.setState({
        indicators: indicators,
      });
    });
  }

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <Wrapper>
        <FormBox onSubmit={this.handleSubmit}>
          <H3>Add Key Performance Indicator</H3>
          <InputWrapper className="input-field" style={{ width: "100%" }}>
            <InputLabel htmlFor="text">
              Custom Key Performance Indicator
            </InputLabel>
            <InputStyled type="text" id="kpi" onChange={this.handleChange} />
          </InputWrapper>
          <ButtonWrapper>
            <ButtonStyled className="btn waves-effect ">Add</ButtonStyled>
          </ButtonWrapper>
        </FormBox>
        <FormBox onSubmit={this.handleQuestionSubmit}>
          <H3>Add Question to KPI</H3>
          <InputWrapper className="input-field" style={{ width: "100%" }}>
            <InputLabel htmlFor="text">Question</InputLabel>
            <InputStyled
              type="text"
              id="question"
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper className="input-field">
            <InputLabel htmlFor="text">Min Value</InputLabel>
            <InputStyled
              type="text"
              id="minValue"
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper className="input-field">
            <InputLabel htmlFor="text">Max Value</InputLabel>
            <InputStyled
              type="text"
              id="maxValue"
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper className="input-field" style={{ width: "100%" }}>
            <Input
              s={12}
              type="select"
              label="Which Indicator?"
              defaultValue="0"
              onChange={this.handleSelect}
            >
              {this.state.indicators.map((kpi, i) => (
                <option key={i} value={kpi.name}>
                  {kpi.name}
                </option>
              ))}
            </Input>
          </InputWrapper>
          <ButtonWrapper>
            <ButtonStyled className="btn waves-effect ">Add</ButtonStyled>
          </ButtonWrapper>
        </FormBox>
        <FormBox>
          <H3>Current KPIs</H3>
          <Table style={{ padding: "100px" }}>
            <thead>
              <tr>
                <TableColumn>Name</TableColumn>
                <TableColumn>Related Questions</TableColumn>
                <TableColumn>Actions</TableColumn>
              </tr>
            </thead>
            <tbody>
              {this.state.indicators.map((kpi, i) => (
                <TableRow key={i} value={kpi}>
                  <TableCell>{kpi.name}</TableCell>
                  <TableCell>{kpi.questions.length || "0"}</TableCell>
                  <TableCell>
                    <ButtonStyledRed
                      className="btn waves-effect "
                      onClick={(e) => this.handleDelete(e, kpi.name)}
                    >
                      Delete
                    </ButtonStyledRed>
                    <ButtonStyledRed className="btn waves-effect disabled">
                      Import
                    </ButtonStyledRed>
                    <ButtonStyledRed className="btn waves-effect disabled">
                      Export
                    </ButtonStyledRed>
                  </TableCell>
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
  padding-bottom: 1em;
  margin-top: 4em;
  
  @media (max-width: 768px) {
    padding: 1em;
  }
`;

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
  border-bottom: 0.5px solid grey !important;

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
    addIndicator: (kpi) => dispatch(addIndicator(kpi)),
    deleteIndicator: (kpi) => dispatch(deleteIndicator(kpi)),
    addQuestion: (question) => dispatch(addQuestion(question)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorSetup);
