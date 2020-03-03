import React from "react";
import JobApplications from "../components/JobApplications";
import { connect } from "react-redux";
import { fetchJobApplications, fetchSingleJob } from "../redux";

const mapStateToProps = state => ({
  ...state.jobApplication
});

const mapDispatchToProps = dispatch => ({
  fetchJobApplicationsDispatch: () => dispatch(fetchJobApplications()),
  fetchSingleJobDispatch: number => dispatch(fetchSingleJob(number))
});

export default (JobApplicationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobApplications));
