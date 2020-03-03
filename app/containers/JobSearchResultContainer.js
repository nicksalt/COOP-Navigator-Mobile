import React from "react";
import JobSearchResult from "../components/JobSearchResult";
import { connect } from "react-redux";
import { fetchJobs, fetchSingleJob } from "../redux";

const mapStateToProps = state => ({
  ...state.jobSearch
});

const mapDispatchToProps = dispatch => ({
  fetchJobsDispatch: () => dispatch(fetchJobs()),
  fetchSingleJobDispatch: number => dispatch(fetchSingleJob(number))
});

export default (JobSearchResultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSearchResult));
