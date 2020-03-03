import React from "react";
import JobSearch from "../app/components/JobSearch";
import renderer from "react-test-renderer";
jest.mock("ScrollView", () => "ScrollView");
jest.mock("../app/components/MultiSelect", () => "MultiSelect");

test("JobSearch snapshot renders correctly", () => {
  const tree = renderer.create(<JobSearch />).toJSON();
  expect(tree).toMatchSnapshot();
});
