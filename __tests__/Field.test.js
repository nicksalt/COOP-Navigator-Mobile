import React from "react";
import { Text } from "react-native";
import Field from "../app/components/Field";
import renderer from "react-test-renderer";

jest.mock("ScrollView", () => "ScrollView");

test("Field snapshot renders correctly", () => {
  let tree = renderer
    .create(<Field field={"Name"} fieldValue={"John"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  tree = renderer
    .create(<Field field={"Name"} fieldValue={<Text>John</Text>} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
