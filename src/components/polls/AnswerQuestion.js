/**
 * AnswerQuestion.js is a dynamic and responsive slider form component 
 * that makes it possible to answer poll questions and triggers firebase 
 * cloud functions to update user KPI data in the database.
 *
 * @public
 */

import React, { Component } from "react";
import { submitPoll } from "../../store/actions/pollActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./AnswerQuestion.css";

class AnswerQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pollAnswers: [],
      questionAnswers: [],
      questionsAnswered: [],
      trust: 100,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    var answers = this.state.questionAnswers;
    answers[e.target.id] = e.target.value;

    this.setState({
      questionAnswers: answers,
    });
  };

  handleSubmit = (e, questions) => {
    e.preventDefault();
    const { profile } = this.props;
    this.props.submitPoll(this.state.questionAnswers, questions, profile.uid);
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const questions = profile.questionsWaiting;

    if (questions)
      return (
        <Wrapper>
          <Slider className="slider-wrapper">
            {questions &&
              questions.map((item, index) => (
                <div
                  key={index}
                  className="slider-content"
                  style={{ background: "#2e355d" }}
                >
                  <H2>
                    Question {index + 1} of {questions.length}
                  </H2>
                  <div className="inner">
                    <Button
                      className="btn waves-effect "
                      onClick={(e) => this.handleSubmit(e, questions)}
                    >
                      Submit All Answers
                    </Button>
                    <H3>{item.question}</H3>

                    <form action="#">
                      <p className="range-field">
                        <P className="right" style={{ margin: "1em" }}>
                          {item.maxValue}
                        </P>
                        <input
                          type="range"
                          id={index}
                          min="0"
                          max="10"
                          step="1"
                          value={item.answer}
                          name="answers"
                          data-orientation="vertical"
                          onChange={(e) => {
                            this.handleChange(e, item.kpi, item.question);
                          }}
                        />
                        <P className="left" style={{ margin: "1em" }}>
                          {item.minValue}
                        </P>
                      </p>
                    </form>
                  </div>
                  <section>
                    <span>
                      <H2 className="kpi">{item.kpi}</H2>
                    </span>
                  </section>
                </div>
              ))}
          </Slider>
        </Wrapper>
      );

    return (
      <Wrapper>
        <Box>
          <H1>All Questions answered, please check back tomorrow.</H1>
        </Box>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  @media (max-width: 1386px) {
    padding: 4.9em 1em;
  }

  @media (max-width: 768px) {
    padding: 4.9em 0em;
    margin-top:0em;
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
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border: 0;

  @media (max-width: 1335px) {
    width: 100%;
    padding: 1rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .select-wrapper input.select-dropdown {
    background-color: #e1e2e1 !important;
    width: 50% !important;;
    margin: auto !important;;
  }

  .select-wrapper span.caret {
    right: 26% !important;
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

  @media (max-width: 768px) {
    margin: 2em 0;
    &:last-of-type {
      margin-top: 3.5em;
    }
  }

`;

const H3 = styled.h3`
  margin: auto;
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 1em;
  color: black;

  @media (max-width: 1335px) {
    font-size: 1.5rem;
    margin-bottom: 4em;
    color: black;
  }

  @media (max-width: 769px) {
    margin-bottom: 8em;
    color: #e1e2e1;
    &.kpi {
      margin-bottom: 1em;
    }
  }
`;

const P = styled.div`
  margin: auto;
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 1em;
  color: black;

  @media (max-width: 1335px) {
    font-size: 1.2rem;
    color: black;
    &.left {
      position: absolute;
      left: -1em;
      top: -4em;
      width: 80%;
    }

    &.right {
      position: absolute;
      right: -1em;
      top: 2.5em;
      width: 80%;
      text-align: right;
    }
  }

  @media (max-width: 769px) {
    color: #e1e2e1;
  }
`;

const Button = styled.button`
  margin-bottom: 5em;
  padding: 0 2em;
  font-size: 1.2rem;
  background: #e1e2e1 !important;
  color: #1e847f;
  /* From: https://boxshadows.nakulrathore.com/ */
  box-shadow: 0 6px 6px rgba(10, 16, 20, 0.15), 0 0 52px rgba(10, 16, 20, 0.12);
  border: 0;

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitPoll: (answers, questions, uid) =>
      dispatch(submitPoll(answers, questions, uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);
