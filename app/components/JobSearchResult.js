import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import PropTypes from "prop-types";
import JobListItem from "./JobListItem";

export default class JobSearchResult extends React.Component {
  componentDidMount = () => {
    this._fetchJobs();
  };

  render() {
    if (this.props.errorOccurred) {
      return (
        <View>
          <Text>There was an error fetching jobs:</Text>
          <Text>{this.props.error.message}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.jobs}
        keyExtractor={job => job.jobId.toString()}
        refreshing={!!this.props.isFetching}
        onRefresh={this._fetchJobs}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          !this.props.isFetching && <Text>No matching jobs.</Text>
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

  _fetchJobs = () => {
    this.props.fetchJobsDispatch();
  };
}

JobSearchResult.propTypes = {
  jobs: PropTypes.array,
  isFetching: PropTypes.bool,
  errorFetchingJobs: PropTypes.bool,
  error: PropTypes.object
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#ccc"
  }
});
