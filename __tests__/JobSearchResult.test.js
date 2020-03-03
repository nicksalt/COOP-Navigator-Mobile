import React from "react";
import JobSearchResult from "../app/components/JobSearchResult";
import renderer from "react-test-renderer";

jest.mock("FlatList", () => "FlatList");

test("JobSearchResult snapshot renders correctly", () => {
  let props = {};
  props.fetchJobsDispatch = () => {};
  props.isFetching = true;
  let tree = renderer.create(<JobSearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.isFetching = false;
  props.errorOccurred = true;
  props.error = { message: "ERROR OCCURRED" };
  tree = renderer.create(<JobSearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.errorOccurred = false;
  props.jobs = [];
  tree = renderer.create(<JobSearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
