import React from "react";
import JobSearch from "../components/JobSearch";
import { connect } from "react-redux";
import { saveSearchPref, setSearchParams } from "../redux";

const mapStateToProps = state => ({
  searchPref: state.searchPref
});

const mapDispatchToProps = dispatch => ({
  savePrefDispatch: searchPref => dispatch(saveSearchPref(searchPref)),
  setSearchParamsDispatch: searchParams =>
    dispatch(setSearchParams(searchParams))
});

export default (JobSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSearch));
