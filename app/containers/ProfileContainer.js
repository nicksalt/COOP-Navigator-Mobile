import React from "react";
import { connect } from "react-redux";
import Profile from "../components/Profile";
import { fetchProfile } from "../redux";

const mapStateToProps = state => ({
  ...state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProfileDispatch: () => dispatch(fetchProfile())
});

export default (ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile));
