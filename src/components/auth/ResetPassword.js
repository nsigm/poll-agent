/**
 * ResetPassword.js Component
 * Renders passwort reset form and triggers Email Reset via action attached to props.
 * 
 * @public
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";
import styled from "styled-components";
import introMountain from "../../res/mountain.png";
import Teacher2 from "../../res/teacher2.png";

class ResetPassword extends Component {
  state = {
    email: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleResetPassword = (e) => {
    e.preventDefault();
    this.props.resetPassword(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <Wrapper>
        <SignupSection>
          <H2>No worries, I'll help you out!</H2>
          <img
            src={Teacher2}
            alt="icon"
            width="80"
            height="80"
            style={{ margin: "auto", width: "100" }}
          ></img>
          <SignupSectionForm onSubmit={this.handleResetPassword}>
            <H3>Request a reset:</H3>
            <InputWrapper className="input-field" style={{ width: "100%" }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="text" id="email" onChange={this.handleChange} />
            </InputWrapper>
            <ButtonWrapper>
              <Button className="btn waves-effect ">Send Reset Link</Button>
              <InputValidationError>
                {authError ? <p>Please try again: {authError}</p> : null}
              </InputValidationError>
            </ButtonWrapper>
          </SignupSectionForm>
        </SignupSection>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const SignupSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20vh 5vw;
  background: #e1e2e1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url(${introMountain});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.1;
  }
`;

const H2 = styled.h2`
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 2.8rem;
  font-weight: 300;
  margin-top: -10vh;
`;

const H3 = styled.h3`
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 2rem;
  margin: auto;
`;

const SignupSectionForm = styled.form`
  padding: 20px;
  margin: auto;
  width: 60%;
  height: 60%;
  display: flex;
  flex-shrink: 0;
  flex-flow: row wrap;
  background: #e1e2e1;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border: 5px solid #2e355d;
`;

const InputWrapper = styled.div`
  margin-right: 15px;
  width: calc(50% - 15px);
`;

const InputLabel = styled.label`
  font-size: 1.2rem !important;
  color: #9e9e9e !important;

  &.active {
    color: #1e847f !important;
  }
`;

const Input = styled.input`
  height: 3.3rem !important;
  font-size: 1.3rem !important;
  border-bottom: 2px solid #6c6c6c !important;
  margin: 2px !important;

  &:focus {
    border-bottom: 2px solid #1e847f !important;
    -webkit-box-shadow: 0 2px 0 0 #1e847f !important;
    box-shadow: 0 2px 0 0 #1e847f !important;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

const Button = styled.button`
  margin: 20px;
  padding: 0px 2em;
  width: auto;
  font-size: 1.2rem;
  border-radius: 5px;
  background: #2e355d !important;
  color: white;

  &:hover {
    background: #1e847f !important;
    transform: translateY(-2px);
  }
`;

const InputValidationError = styled.div`
  color: #f64c72 !important;
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
