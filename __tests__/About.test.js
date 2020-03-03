import React from "react";
import About from "../app/components/About";
import renderer from "react-test-renderer";

jest.mock("ScrollView", () => "ScrollView");

test("About snapshot renders correctly", () => {
  const tree = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});
