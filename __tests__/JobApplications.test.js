import React from "react";
import JobApplications from "../app/components/JobApplications";
import renderer from "react-test-renderer";

jest.mock("FlatList", () => "FlatList");

test("JobApplications snapshot renders correctly", () => {
  let props = {};
  props.fetchJobApplicationsDispatch = () => {};
  props.isFetching = true;
  let tree = renderer.create(<JobApplications {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.isFetching = false;
  props.errorOccurred = true;
  props.error = { message: "ERROR OCCURRED" };
  tree = renderer.create(<JobApplications {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.errorOccurred = false;
  props.jobs = [];
  tree = renderer.create(<JobApplications {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
