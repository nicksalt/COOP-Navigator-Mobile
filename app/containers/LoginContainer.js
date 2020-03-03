import React from "react";
import Login from "../components/Login";
import { connect } from "react-redux";
import { login } from "../redux";

const mapStateToProps = state => ({
  ...state.profile
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: (email, password) => dispatch(login(email, password))
});

export default (LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
