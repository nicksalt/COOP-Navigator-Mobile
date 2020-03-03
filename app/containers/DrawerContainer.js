import React from "react";
import { connect } from "react-redux";
import Drawer from "../components/Drawer";
import { logout } from "../redux";

const mapStateToProps = state => ({
  ...state.profile
});

const mapDispatchToProps = dispatch => ({
  logoutDispatch: () => dispatch(logout())
});

export default (DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer));
