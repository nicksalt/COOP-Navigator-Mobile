import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import JobListItem from "./JobListItem";

export default class JobApplications extends Component {
  componentDidMount = () => {
    this.props.fetchJobApplicationsDispatch();
  };

  render() {
    if (this.props.errorOccurred) {
      return (
        <View>
          <Text>There was an error fetching your applications:</Text>
          <Text>{this.props.error.message}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.jobs}
        keyExtractor={job => job.jobId.toString()}
        refreshing={!!this.props.isFetching}
        onRefresh={this.props.fetchJobApplicationsDispatch}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          !this.props.isFetching && (
            <Text style={styles.centerMsg}>
              You have not applied to any jobs.
            </Text>
          )
        }
        renderItem={({ item }) => (
          <JobListItem
            job={item}
            navigation={this.props.navigation}
            fetchSingleJobDispatch={this.props.fetchSingleJobDispatch}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#ccc"
  },
  centerMsg: {
    padding: 5,
    fontSize: 13,
    textAlign: "center",
    color: "black",
    margin: 2
  }
});
