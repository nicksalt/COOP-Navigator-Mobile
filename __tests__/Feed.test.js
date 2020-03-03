import React from "react";
import FeedContainer from "../app/containers/FeedContainer";
import renderer from "react-test-renderer";

jest.mock("FlatList", () => "FlatList");

test("Feed snapshot renders correctly", () => {
  const tree = renderer.create(<FeedContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
