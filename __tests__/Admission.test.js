import React from "react";
import Admission from "../app/components/Admission";
import renderer from "react-test-renderer";

jest.mock("ScrollView", () => "ScrollView");

test("Admission snapshot renders correctly", () => {
  const tree = renderer.create(<Admission />).toJSON();
  expect(tree).toMatchSnapshot();
});
