import React from "react";
import Interviews from "../app/components/Interviews";
import renderer from "react-test-renderer";

jest.mock("FlatList", () => "FlatList");

test("Interviews snapshot renders correctly", () => {
  let props = {};
  props.fetchInterviewsDispatch = () => {};
  props.isFetching = true;
  let tree = renderer.create(<Interviews {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.isFetching = false;
  props.errorOccurred = true;
  props.error = { message: "ERROR OCCURRED" };
  tree = renderer.create(<Interviews {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.errorOccurred = false;
  props.interviews = [];
  tree = renderer.create(<Interviews {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
