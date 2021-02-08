/**
 * LandingPage.js Component
 * Renders and implements basic saas landing page for page visitors and provides bullet point description
 * of the application, little impressum and copyright area, registration form for organizations, login form for users and
 * links to ResetPassword.js component. Using Firebase and our Redux store for managing authorization.
 * 
 * @public
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerOrganization, login } from "../../store/actions/authActions";
import styled from "styled-components";
import IntroSky from "../../res/intro-sky.jpg";
import introMountain from "../../res/mountain.png";
import Qd3CTA from "../../res/call-cta.png";
import SLDLogo from "../../res/sld_logo-icon.png";
import Talk from "../../res/talk.png";
import Graduate from "../../res/graduate.png";
import Teacher from "../../res/teacher.png";
import FeedbackImage from "../../res/celpax.jpg";
import Polling2 from "../../res/polling2.png";
import Teacher2 from "../../res/teacher2.png";
import Feelings from "../../res/feelings.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    organizationName: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleRegisterOrganization = (e) => {
    e.preventDefault();
    this.props.registerOrganization(this.state);
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <Wrapper>
        <IntroSection>
          <img
            src={Teacher2}
            alt="icon"
            width="80"
            height="80"
            style={{ margin: "auto", position: "relative" }}
          ></img>
          <H1 style={{ color: "black" }}>PollAgent</H1>
          <StockImage>
            <IntroText1>
              Create polls to continously evaluate and improve your work environment.
            </IntroText1>
            <IntroText2>
              Use custom key performance indicators and let PollAgent evaluate
              them.
            </IntroText2>
            <IntroText3>
              Setup continous feedback cycles to improve engagement and
              retention.
            </IntroText3>
            <IntroText4>
              Upcoming: Tensorflow.js integration for HR management recommendations.
            </IntroText4>
          </StockImage>
          <p
            style={{
              color: "#373737",
              whiteSpace: "pre-line",
              width: "50%",
              margin: "20px auto 0px auto",
              position: "relative",
            }}
          >
            Concept and development by Nils Sigmund {"\n"}as part of a thesis at
            the University of Applied Sciences Berlin in cooperation with {"\n"} Qd3
            and Sleighdogs.
          </p>
          <a target="_blank" rel="noreferrer" href="https://qd3.org/">
            <img
              src={Qd3CTA}
              alt="Qd3 Logo"
              width="80"
              height="80"
              style={{ margin: "0px -10px 0px 0px", position: "relative" }}
            ></img>
          </a>
          <a target="_blank" rel="noreferrer" href="https://sld.gs/">
            {" "}
            <img
              src={SLDLogo}
              alt="SLD Logo"
              width="80"
              height="80"
              style={{ margin: "15px 0px 0px 0px", position: "relative" }}
            ></img>
          </a>
          <div
            style={{ display: "block", color: "#373737", position: "relative" }}
          >
            Icons used for this prototype are by Freepik from{" "}
            <a target="_blank" rel="noreferrer" href="https://www.flaticon.com">
              www.flaticon.com
            </a>
          </div>
          <div
            style={{ display: "block", color: "#373737", position: "relative" }}
          >
            Image from{" "}
            <a target="_blank" rel="noreferrer" href="https://unsplash.com/photos/1Lf5Adh9SCg">
              celpax
            </a>{" "}
            on Pexels
          </div>
          <div
            style={{ display: "block", color: "#373737", position: "relative" }}
          >
            Rest is from{" "}
            <a target="_blank" rel="noreferrer" href="https://sld.gs">
              www.sld.gs
            </a>{" "}
            and{" "}
            <a target="_blank" rel="noreferrer" href="https://qd3.org">
              www.qd3.org
            </a>{" "}
          </div>
        </IntroSection>
        <SignupSection>
          <H2>Your Digital HR Assistant</H2>
          <Tabs style={{ margin: "20px 0 0 0" }}>
            <TabList>
              <Tab>Register</Tab>
              <Tab>Login</Tab>
            </TabList>
            <TabPanel style={{ background: "#242582" }} title="Register">
              <SignupSectionForm onSubmit={this.handleRegisterOrganization}>
                <H3>Register Organization</H3>
                <InputWrapper className="input-field">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input type="email" id="email" onChange={this.handleChange} />
                </InputWrapper>
                <InputWrapper className="input-field">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </InputWrapper>
                <InputWrapper className="input-field">
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input
                    type="text"
                    id="firstName"
                    onChange={this.handleChange}
                  />
                </InputWrapper>
                <InputWrapper className="input-field">
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input
                    type="text"
                    id="lastName"
                    onChange={this.handleChange}
                  />
                </InputWrapper>
                <InputWrapper className="input-field" style={{ width: "100%" }}>
                  <InputLabel htmlFor="organizationName">
                    Organization Name
                  </InputLabel>
                  <Input
                    type="text"
                    id="organizationName"
                    onChange={this.handleChange}
                  />
                </InputWrapper>
                <ButtonWrapper>
                  <Button className="btn waves-effect ">Register</Button>
                  <InputValidationError>
                    {authError ? <p>Please try again: {authError}</p> : null}
                  </InputValidationError>
                </ButtonWrapper>
              </SignupSectionForm>
            </TabPanel>
            <TabPanel>
              <SigninSectionForm onSubmit={this.handleLogin}>
                <H3>Login To Existing Account</H3>
                <InputWrapper className="input-field">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input type="email" id="email" onChange={this.handleChange} />
                </InputWrapper>
                <InputWrapper className="input-field">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </InputWrapper>
                <ResetPasswort>
                  <Link to="/reset-password" style={{ color: "#9e9e9e" }}>
                    Reset Password
                  </Link>
                </ResetPasswort>
                <ButtonWrapper>
                  <Button className="btn waves-effect ">Login</Button>
                  <InputValidationError>
                    {authError ? <p>Please try again: {authError}</p> : null}
                  </InputValidationError>
                </ButtonWrapper>
                <img
                  src={Feelings}
                  alt="icon"
                  width="80"
                  height="80"
                  style={{ margin: "auto", width: "100" }}
                ></img>
              </SigninSectionForm>
            </TabPanel>
          </Tabs>
        </SignupSection>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const SignupSection = styled.section`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20vh 5vw;
  border-left: 5px solid #cfa62c;
  border-right: 5px solid #cfa62c;
  border-bottom: 5px solid #f64c72;
  border-top: 5px solid #f64c72;

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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border: none;
  }

  .react-tabs__tab {
    color: black;
    border: none;

    &-list {
      border-bottom: 5px solid #2e355d;
      margin-bottom: -1px;
    }

    &--selected {
      color: white;
      background: #2e355d;
      border: none;
    }
  }
`;


const IntroSection = styled.section`
  position: relative;
  width: 60%;
  overflow: hidden;
  background: black;
  padding: 15vh 5vw 40vh 5vw;

  a {
    color: #e1e2e1;

    &:hover {
      opacity: 0.8;
    }
  }

  img {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url(${IntroSky});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StockImage = styled.section`
  display: flex;
  flex-direction: inherit;
  padding: 2vh 2vw;
  background: #e1e2e1;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 5px solid #2e355d;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url(${FeedbackImage});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.1;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const H1 = styled.h1`
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 4.5rem;
  font-weight: 300;
  margin-top: -15vh;
  color: black;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const H2 = styled.h2`
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 2.8rem;
  font-weight: 300;
  margin-top: -10vh;
  margin-bottom: 0px;
  color: black;
`;

const H3 = styled.h3`
  position: relative;
  width: 100%;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 2rem;
  margin-bottom: 18px;
  color: black;
`;

const IntroText1 = styled.p`
  position: relative;
  color: black;
  padding: 15px;
  text-align: center;
  width: 25%;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-4px);
    transition: 250ms;
    cursor: context-menu;
  }

  &::before {
    content: "";
    padding: 40px;
    display: block;
    background: url(${Graduate}) top center;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    background-size: 60px;
  }
`;

const IntroText2 = styled(IntroText1)`
  &::before {
    display: block;
    background: url(${Teacher}) top center;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    background-size: 60px;
  }
`;

const IntroText3 = styled(IntroText1)`
  &::before {
    display: block;
    background: url(${Talk}) top center;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    background-size: 60px;
  }
`;

const IntroText4 = styled(IntroText1)`
  &::before {
    display: block;
    background: url(${Polling2}) top center;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    background-size: 60px;
  }
`;

const ResetPasswort = styled.p`
  position: relative;
  color: #9e9e9e !important;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupSectionForm = styled.form`
  padding: 20px;
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  flex-flow: row wrap;
  background: #e1e2e1;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border-left: 5px solid #2e355d;
  border-right: 5px solid #2e355d;
  border-bottom: 5px solid #2e355d;
`;

const SigninSectionForm = styled(SignupSectionForm)`
  padding: 1.5rem;
`;

const InputWrapper = styled.div`
  margin-right: 15px;
  width: calc(50% - 15px);
  color: black;
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
    registerOrganization: (newAdmin) => dispatch(registerOrganization(newAdmin)),
    login: (creds) => dispatch(login(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
