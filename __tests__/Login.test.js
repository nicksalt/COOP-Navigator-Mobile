import React from "react";
import Login from "../app/components/Login";
import renderer from "react-test-renderer";

//login test
test("Login snapshot renders correctly", () => {
  const props = {};
  let tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
  props.attemptingLogin = true;
  tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
  props.loginError = { message: "FAILED LOGIN" };
  tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
