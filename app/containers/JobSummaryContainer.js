import React from "react";
import JobSummary from "../components/JobSummary";
import { connect } from "react-redux";
import { fetchSingleJob, createJobApplication } from "../redux";

const mapStateToProps = state => ({
  ...state.jobApplication,
  ...state.jobSummary
});

const mapDispatchToProps = dispatch => ({
  fetchSingleJobDispatch: number => dispatch(fetchSingleJob(number)),
  createJobApplicationDispatch: jobId => dispatch(createJobApplication(jobId))
});

export default (JobSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSummary));
