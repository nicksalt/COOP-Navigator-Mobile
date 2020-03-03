import React from "react";
import JobSummary from "../app/components/JobSummary";
import renderer from "react-test-renderer";

jest.mock("ScrollView", () => "ScrollView");

test("JobSummary snapshot renders correctly", () => {
  let props = {};
  props.fetchJobSummaryDispatch = () => {};
  props.isFetching = true;
  let tree = renderer.create(<JobSummary {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.isFetching = false;
  props.errorOccurred = true;
  props.error = { message: "ERROR OCCURRED" };
  tree = renderer.create(<JobSummary {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.errorOccurred = false;
  props.applicationSuccessful = true;
  props.job = {
    jobId: 100,
    term: "2018, Summer",
    openForRound: "1",
    numberOfPositions: 4,
    employerJobNumber: "22A",
    englishTitle: "Software Developer/Engineer",
    frenchTitle: "Développeur de logiciels",
    organization: "Apple",
    organizationWebsite: "",
    division: "",
    expiryDate: "Fri Apr 13 2018 23:59:00 GMT-0400 (Eastern Daylight Time)",
    status: "active",
    duration: 4,
    salary: "35$/hour",
    frenchDescription:
      "100 FRENCH Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    englishDescription:
      "100  ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum doloreeu fugiat nulla pariatur. Excepteur sint occaecat cupidatatnon proident, sunt in culpa qui officia deserunt mollit animid est laborum",
    language: "English or Bilingual",
    securityClearance: "Level 2 (secret)",
    minimumCPGA: "9",
    requirements: "",
    address: {
      country: "Canada",
      stateOrProvince: "Ontario",
      city: "Ottawa",
      street: "124 Bank Street",
      postalCode: "A1B2C3"
    },
    preferredProgramsOfStudy: ["computer engineering", "software engineering"]
  };
  tree = renderer.create(<JobSummary {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
  props.applicationSuccessful = false;
  props.applicationFailed = true;
  tree = renderer.create(<JobSummary {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
