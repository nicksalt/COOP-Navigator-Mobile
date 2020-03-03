import React from "react";
import Profile from "../app/components/Profile";
import renderer from "react-test-renderer";

jest.mock("ScrollView", () => "ScrollView");

test("Profile snapshot renders correctly", () => {
  const props = {};
  props.isFetching = true;
  let tree = renderer.create(<Profile {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.isFetching = false;
  props.errorOccurred = true;
  props.error = { message: "ERROR OCCURRED" };
  tree = renderer.create(<Profile {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.errorOccurred = false;
  props.studentProfile = {
    studentId: "7680262",
    title: "Mr.",
    lastName: "Mizon",
    firstName: "Alexandre",
    gender: "M",
    language: "English",
    citizenship: "Canadian",
    proofOfStatus: false,
    programOfStudy: "Software Engineering",
    requireAccessibleFacilities: false,
    placementIntention: false,
    email: "amizo067@uottawa.ca",
    password: "lethalpassword",
    linkedIn: "",
    skype: "",
    phoneNumber: "6142225555",
    address: {
      country: "Canada",
      stateOrProvince: "ON",
      city: "Ottawa",
      street: "800 King Edward Ave",
      postalCode: "K8H 4Z3"
    },
    termSequence: [
      {
        term: "2014, Fall",
        status: "study",
        programOfStudy: "Software Eng.",
        worktermReportGrade: "",
        course: ""
      },
      {
        term: "2015, Winter",
        status: "study",
        programOfStudy: "Software Eng.",
        worktermReportGrade: "",
        course: ""
      },
      {
        term: "2015, Summer",
        status: "work",
        programOfStudy: "Software Eng.",
        worktermReportGrade: "P",
        course: "SEG2901"
      }
    ]
  };
  tree = renderer.create(<Profile {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
