import React from "react";
import JobListItem from "../app/components/JobListItem";
import renderer from "react-test-renderer";

test("JobListItem snapshot renders correctly", () => {
  let props = {
    job: {
      jobId: 100,
      englishTitle: "Job In English",
      frenchTitle: "Job En Francais",
      organization: "A Fancy Org"
    }
  };
  const tree = renderer.create(<JobListItem {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
