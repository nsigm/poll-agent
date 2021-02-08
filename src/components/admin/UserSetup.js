/**
 * Admin.js Component
 * Makes it possible for an Admin in the future to manage and invite users to the organization. 
 * Is going to serve as placeholder for a more complex admin interface.
 * 
 * @public
 */

import React, { Component } from "react";
import { addUser, deleteUser } from "../../store/actions/adminActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Table } from "react-materialize";
import firebase from "../../config/fbConfig";
import styled from "styled-components";
import FormBox from "../../styles/FormBox.js";
import InputWrapper from "../../styles/InputWrapper.js";
import InputLabel from "../../styles/InputLabel.js";
import InputStyled from "../../styles/InputStyled.js";
import ButtonStyled from "../../styles/ButtonStyled.js";
import AdminWrapper from "../../styles/AdminWrapper.js";

class UserSetup extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      email: "",
      role: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {
    this.fetchUsers();
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
    this.props.addUser({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
    this.props.history.push("/admin");
  };

  handleDelete = (e, uid) => {
    e.preventDefault();
    this.props.deleteUser(uid);
  };

  fetchUsers() {
    const { auth } = this.props;
    var usersRef = firebase.firestore().collection("users");
    var userList = [];
    usersRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        var user = doc.data();
        if (doc.id !== auth.uid) {
          userList.push({
            firstName: user.firstName,
            lastName: user.lastName,
            uid: user.uid,
            role: user.role,
            status: user.status,
            picture: user.picture,
            email: user.email
          });
        }
      });
      this.setState({
        userList: userList,
      });
    });
  }

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <AdminWrapper>
        <FormBox onSubmit={this.handleSubmit}>
          <H3>Invite Users</H3>
          <InputWrapper className="input-field" style={{ width: "100%" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <InputStyled type="email" id="email" onChange={this.handleChange} />
          </InputWrapper>
          <InputWrapper className="input-field">
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <InputStyled type="text" id="firstName" onChange={this.handleChange} />
          </InputWrapper>
          <InputWrapper className="input-field">
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <InputStyled type="text" id="lastName" onChange={this.handleChange} />
          </InputWrapper>
          <ButtonWrapper>
            <Button className="btn waves-effect ">Add to Whitelist</Button>
          </ButtonWrapper>
        </FormBox>
        <FormBox style={{overflow: "auto"}}>
          <H3>User List</H3>
          <Table style={{ padding: "100px" }}>
            <thead>
              <tr>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
              </tr>
            </thead>
            <tbody>
              {this.state.userList.map((user, i) => (
                <TableRow key={i} value={user}>
                  <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <ButtonStyledRed
                      className="btn waves-effect "
                      onClick={(e) => this.handleDelete(e, user.uid)}
                    >
                      Delete
                    </ButtonStyledRed>
                    <ButtonStyledRed className="btn waves-effect disabled">
                      {user.role === "admin" ? "Ungrant Admin" : "Grant Admin"}
                    </ButtonStyledRed>
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
`;

const Button = styled.button`
  margin-top: 25px;
  padding: 0px 2em;
  font-size: 1.2rem;
  border-radius: 5px;
  background: #2e355d !important;
  color: white;

  &:hover {
    background: #1e847f !important;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 5px;
  }
`;

const ButtonStyledRed = styled(ButtonStyled)`
  margin: 10px;
  &:hover {
    background: #f64c72 !important;
  }
`;

const TableColumn = styled.th``;

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
    addUser: (user) => dispatch(addUser(user)),
    deleteUser: (uid) => dispatch(deleteUser(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetup);
