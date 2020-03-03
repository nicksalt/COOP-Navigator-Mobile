import React from "react";
import Drawer from "../app/components/Drawer";
import renderer from "react-test-renderer";

jest.mock("ScrollView", () => "ScrollView");
jest.mock("react-navigation", () => ({
  get DrawerItems() {
    return "DrawerItems";
  }
}));

test("Drawer snapshot renders correctly", () => {
  const tree = renderer
    .create(
      <Drawer studentProfile={{ firstName: "John", lastName: "Smith" }} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
