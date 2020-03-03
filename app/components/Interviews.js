import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import JobListItem from "./JobListItem";

export default class Interviews extends React.Component {
  componentDidMount = () => {
    this.props.fetchInterviewsDispatch();
  };

  render() {
    if (this.props.errorOccurred) {
      return (
        <View>
          <Text>There was an error fetching the interviews: </Text>
          <Text>{this.props.error.message}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.interviews}
        keyExtractor={interview => interview.interviewId.toString()}
        refreshing={!!this.props.isFetching}
        onRefresh={this.props.fetchInterviewsDispatch}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          !this.props.isFetching && <Text>You have no interviews.</Text>
        }
        renderItem={({ item }) => <InterviewListItem interview={item} />}
      />
    );
  }
}

class InterviewListItem extends React.Component {
  render() {
    const { interview } = this.props;
    const datetime = new Date(interview.date);
    const date = datetime.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    const time = datetime.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric"
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{interview.organization}</Text>
          <Text style={styles.jobId}>{"Job ID: " + interview.jobId}</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.subHeading}>{interview.englishTitle}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {date + " - " + time + " - " + interview.location}
          </Text>
        </View>
      </View>
    );
  }
}

JobListItem.propTypes = {
  job: PropTypes.shape({
    jobId: PropTypes.number,
    englishTitle: PropTypes.string,
    frenchTitle: PropTypes.string,
    organization: PropTypes.string
  })
};

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "space-between"
  },
  heading: {
    fontSize: 18,
    color: "#a9343a"
  },
  jobId: {
    color: "gray",
    fontSize: 12
  },
  subHeading: {
    fontSize: 18
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 10
  },
  footerText: {
    fontWeight: "bold"
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc"
  }
});

Interviews.propTypes = {
  jobs: PropTypes.array,
  isFetching: PropTypes.bool,
  errorFetchingJobs: PropTypes.bool,
  error: PropTypes.object
};
