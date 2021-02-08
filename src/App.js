/**
 * App.js Component
 * Renders and holds component tree using react-router-dom integration for simple but
 * efficient declarative routing in the application tree and creates global styles by using
 * styled-components integration.
 *
 * @public
 *
 * React-router-dom basics are adapted from The Net Ninja's React, Redux & Firebase App Tutorial,
 * available at https://www.youtube.com/watch?v=Oi4v5uxTY5o&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3
 */

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import AppWrapper from "./styles/AppWrapper.js";
import AppInner from "./styles/AppInner.js";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./components/auth/LandingPage";
import CreateCycle from "./components/cycles/CreateCycle";
import GiveBoost from "./components/cycles/GiveBoost";
import Profile from "./components/user/Profile";
import ResetPassword from "./components/auth/ResetPassword";
import CreatePoll from "./components/polls/CreatePoll";
import AnswerQuestion from "./components/polls/AnswerQuestion";
import UserSetup from "./components/admin/UserSetup";
import IndicatorSetup from "./components/admin/IndicatorSetup";
import Insights from "./components/admin/Insights";

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <BrowserRouter>
          <AppInner>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/landing-page" component={LandingPage} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/create-cycle" component={CreateCycle} />
              <Route path="/give-boost" component={GiveBoost} />
              <Route path="/create-poll" component={CreatePoll} />
              <Route path="/answer-question" component={AnswerQuestion} />
              <Route path="/profile" component={Profile} />
              <Route path="/user-setup" component={UserSetup} />
              <Route path="/insights" component={Insights} />
              <Route path="/indicator-setup" component={IndicatorSetup} />
            </Switch>
          </AppInner>
        </BrowserRouter>
      </AppWrapper>
    );
  }
}

export default App;
