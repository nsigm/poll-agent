/**
 * NavBar.js Component
 * Renders and implements simple but responsive hamburger navigation bar, for organizing our component tree
 * in App.js and making it accessible. Making use of our Redux store to manage user authorization and data
 * in the navigation bar.
 *
 * @public
 *
 * Responsive Navbar with hooks is adapted from Brian Design's React Navbar Dropdown Menu Responsive Tutorial
 * available at the following link: https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import { Badge } from "react-materialize";
import styled from "styled-components";
import {
  UserPlus,
  UserCircle,
  PlusCircle,
  ChartLine,
  UserCirclePlus,
  Pedestrian,
  SlidersHorizontal,
  ChatsCircle,
  SignOut,
} from "phosphor-react";
import Hamburger from "hamburger-react";
import Teacher2 from "../../res/teacher2.png";
import introMountain from "../../res/mountain.png";

const NavBar = (props) => {
  const { auth, profile } = props;

  const [dropdown, setDropdown] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [isOpen, setOpen] = useState(false);
  
  const closeMobileMenu = () => setOpen(false); // for closing the nav when clicking on PollAgent Logo

  const isMobile = () => {
    if (window.innerWidth <= 1385) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    isMobile();
  }, []);

  window.addEventListener("resize", isMobile);

  const onMouseEnter = () => {
    if (window.innerWidth < 1385) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 1385) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  if (auth.uid) {
    return (
      <Nav>
        <Link
          to="/"
          className="navbar-logo"
          style={{ display: "flex", flex: "row-reverse" }}
          onClick={closeMobileMenu}
        >
          <img
            src={Teacher2}
            alt={"icon"}
            width="45"
            height="45"
            style={{ position: "relative" }}
          />
          <Logo>PollAgent</Logo>
        </Link>
        <div className="hamburger">
          <Hamburger
            direction="right"
            size={28}
            duration={0.4}
            color="black"
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
        <NavItems className={isOpen ? "active" : ""}>
          <div className="NavItems-left">
            <NavItem>
              <Link
                to="/answer-question"
                onClick={closeMobileMenu}
                className="navLink"
              >
                <SlidersHorizontal size={30} style={{}} />
                <H3>Polls</H3>
                {profile.questionsWaiting && (
                  <Badge
                    style={{
                      background: "#cfa62c",
                      margin: "auto auto auto 0",
                      color: "black",
                    }}
                    data-badge-caption="Questions"
                  >
                    {profile.questionsWaiting.length}
                  </Badge>
                )}
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="/give-boost"
                onClick={closeMobileMenu}
                className="navLink"
              >
                <ChatsCircle size={30} />
                <H3>Cycles</H3>
                {profile.boostsWaiting && profile.boostsWaiting.length > 0 && (
                  <Badge
                    style={{
                      background: "#cfa62c",
                      margin: "auto auto auto 0",
                      color: "black",
                    }}
                    data-badge-caption="Boosts"
                  >
                    {profile.boostsWaiting.length}
                  </Badge>
                )}
              </Link>
            </NavItem>
          </div>
          <div className="NavItems-right">
            <NavItem>
              <Link to="/profile" onClick={closeMobileMenu} className="navLink">
                <UserCircle size={30} />
                <H3>Profile</H3>
              </Link>
            </NavItem>
            {!mobile && (
              <NavItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Link
                  to="/user-setup"
                  onClick={closeMobileMenu}
                  className="navLink"
                >
                  <Pedestrian size={30} />
                  <H3>User Setup</H3>
                </Link>
                {dropdown && (
                  <DropDown
                  >
                    <DropdownItems>
                      <DropdownItem>
                        <Link to="/insights" className="navLink">
                          <ChartLine size={30} />
                          <H3>Insights</H3>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/indicator-setup" className="navLink">
                          <UserPlus size={30} />
                          <H3>Indicator Setup</H3>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/create-cycle" className="navLink">
                          <UserCirclePlus size={30} />
                          <H3>Cycle Setup</H3>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/create-poll" className="navLink">
                          <PlusCircle size={30} />
                          <H3>Poll Setup</H3>
                        </Link>
                      </DropdownItem>
                    </DropdownItems>
                  </DropDown>
                )}
              </NavItem>
            )}
            {mobile && (
              <div>
                <NavItem>
                  <Link
                    to="/insights"
                    onClick={closeMobileMenu}
                    className="navLink"
                  >
                    <ChartLine size={30} />
                    <H3>Insights</H3>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/user-setup"
                    onClick={closeMobileMenu}
                    className="navLink"
                  >
                    <Pedestrian size={30} />
                    <H3>User Setup</H3>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/indicator-setup"
                    onClick={closeMobileMenu}
                    className="navLink"
                  >
                    <UserPlus size={30} />
                    <H3>KPI Setup</H3>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link
                    to="/create-cycle"
                    onClick={closeMobileMenu}
                    className="navLink"
                  >
                    <UserCirclePlus size={30} />
                    <H3>Cycle Setup</H3>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/create-poll"
                    onClick={closeMobileMenu}
                    className="navLink"
                  >
                    <PlusCircle size={30} />
                    <H3>Poll Setup</H3>
                  </Link>
                </NavItem>
              </div>
            )}
            <NavItem>
              <Link to="/logout" onClick={props.signOut} className="navLink">
                <SignOut size={30} />
                <H3>Signout</H3>
              </Link>
            </NavItem>
          </div>
        </NavItems>
      </Nav>
    );
  } else {
    return <Redirect to="/landing-page" />;
  }
};

const Nav = styled.nav`
  position: relative;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background: #f1ebe4;
  border-bottom: 5px solid #1e847f;

  .navbar-logo {
    position: relative;
    height: 77px;
    width: 300px;
    background: #1e847f !important;
    margin-left: 20px;

    img {
      margin-top: 15px;
      margin-left: 32px;
      @media screen and (max-width: 1385px) {
        margin-left: 2.2em;
      }
      @media screen and (max-width: 700px) {
        margin-left: 2em;
      }
    }

    &:hover {
      h3,
      img {
        transform: translateY(-2px);
        transition: 250ms;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url(${introMountain});
    background-attachment: fixed;
    background-position: right;
    background-repeat: no-repeat;
    opacity: 0.5;
  }

  .hamburger {
    display: none;

    @media screen and (max-width: 1385px) {
      display: block;
      position: absolute;
      right: 2em;
    }
    @media screen and (max-width: 700px) {
      right: 1em;
    }
  }

  @media screen and (max-width: 1385px) {
    position: fixed;
    z-index: 20;

    .navbar-logo {
      margin-left: 0px;
    }
  }
  @media screen and (max-width: 700px) {
    .navbar-logo {
      background: unset !important;
      color: black;
    }
    &::before {
      background-image: unset;
    }
  }
`;

const NavItems = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, auto);
  list-style: none;
  text-align: center;
  width: 80vw;
  justify-content: end;


  svg {
    position: relative;
  }

  &.active{
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 20;


    &:hover {
      color: #cfa62c;
      transition: 250ms;
    }
  }

  @media screen and (max-width: 1385px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 80px;
    left: -100%;
    opacity: .1;
    transition: all 0.5s ease;
    
    &.active{
      background: #f1ebe4;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 80px;
  cursor: pointer;
  position: relative;

  h3,
  svg {
    color: black !important;
  }

  svg {
    top: 23px;
  }

  &:hover {
    background-color: #1e847f !important;

    h3,
    svg {
      color: white !important;
    }
  }

  a {
    &:hover {
      background-color: #1e847f !important;
    }
  }

  .navLink {
    display: inline-flex;
    align-self: center;
    padding: 20px 5x !important;
    height: 100%;
    width: 100%;

    @media screen and (max-width: 1385px) {
      &:hover {
        background-color: none !important;
      }
    }
  }

  @media screen and (max-width: 1385px) {
    width: 100%;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 0px;
  list-style: none;
  text-align: start;
  z-index: 1;
`;

const DropdownItems = styled.ul`
  position: absolute;
  top: 80px;
  list-style: none;
  text-align: start;
`;

const DropdownItem = styled.li`
  background: #1e847f;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 70px;
  width: 192px;

  &:Hover {
    a {
      background: #f1ebe4 !important;
    }

    h3, svg {
      color: black !important;
    }
  }
  .clicked {
    display: none;
  }
  .navLink {
    width: 100%;
    height: 100%
    text-decoration: none;
  }
`;

const H3 = styled.h3`
  position: relative;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 1.4rem;
  margin: auto 15px;
  color: black;
  @media screen and (max-width: 1385px) {
    font-size: 2.3rem;
  }
`;

const Logo = styled(H3)`
  font-size: 2.5rem;
  color: white;

  @media screen and (max-width: 700px) {
    color: black;
  }

  &:hover {
    transform: translateY(-2px);
    transition: 250ms;
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
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
