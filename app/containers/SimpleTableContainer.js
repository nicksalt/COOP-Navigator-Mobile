import React from "react";
import SimpleTable from "../components/SimpleTable/SimpleTable";

export default class SimpleTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [
        {
          key: 1,
          city: "Ottawa",
          jobTitle: "COOP Developer"
        },
        {
          key: 3,
          city: "Vancouver",
          jobTitle: "Student Accountant"
        },
        {
          key: 4,
          city: "New York City",
          jobTitle: "Legal Aide"
        }
      ]
    };
  }

  render() {
    return <SimpleTable data={this.state.jobs} />;
  }
}
