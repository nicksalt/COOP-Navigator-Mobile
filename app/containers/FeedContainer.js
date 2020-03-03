import React from "react";
import Feed from "../components/Feed";

export default class FeedContainer extends React.Component {
  state = {
    notifications: temp
  };

  render() {
    return <Feed notifications={this.state.notifications} />;
  }
}

const temp = [
  {
    key: 0,
    icon: "md-calendar",
    title: "Co-op Key Date",
    date: "Oct 18, 2017",
    description:
      "Last day to update your resume for the Winter Coop term is Oct 30, 2017",
    footerText: "Fall - 2nd, 3rd, or 4th work term only"
  },
  {
    key: 1,
    icon: "ios-people",
    title: "New interview!",
    date: "Feb 1, 2018",
    description:
      "IBM selected you for an interview for the position of Junior Software developer",
    footerText: "Winter work term"
  },
  {
    key: 2,
    icon: "ios-trophy",
    title: "Congratulations!",
    date: "Feb 10, 2018",
    description:
      "Google really liked you when you interviewed with them. They have offered you a position as a Software Engineer on their Android team!",
    footerText: "Summer Work Term"
  },
  {
    key: 3,
    icon: "md-calendar",
    title: "Co-op Key Date",
    date: "Apr 27, 2018",
    description:
      "Please head on over to the navigator and confirm your intention to participate in coop before ",
    footerText: "Fall - All work terms"
  },
  {
    key: 4,
    icon: "ios-people",
    title: "New interview!",
    date: "Feb 1, 2018",
    description:
      "YouTube selected you for an interview for the position of Junior Software developer",
    footerText: "Winter work term"
  },
  {
    key: 5,
    icon: "ios-people",
    title: "New interview!",
    date: "Feb 1, 2018",
    description:
      "YouTube selected you for an interview for the position of Junior Software developer",
    footerText: "Winter work term"
  }
];
