import React from "react";
import Interviews from "../components/Interviews";
import { connect } from "react-redux";
import { fetchInterviews } from "../redux";

const mapStateToProps = state => ({
  ...state.interviews
});

const mapDispatchToProps = dispatch => ({
  fetchInterviewsDispatch: () => dispatch(fetchInterviews())
});

export default (InterviewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Interviews));
