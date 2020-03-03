import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

export default class JobSummary extends React.Component {
  applyToJob = () => {
    this.props.createJobApplicationDispatch(this.props.jobId);
    this.forceUpdate();
  };

  render() {
    if (this.props.isFetching) {
      return (
        <View>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    }

    if (this.props.errorOccurred) {
      return (
        <View>
          <Text>There was an error fetching the job:</Text>
          <Text>{this.props.error.message}</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <Text style={styles.subtitle}>Job Summary</Text>
        <View style={styles.container}>
          <Text style={styles.field}>Job Number:</Text>
          <Text style={styles.fieldValue}>{this.props.job.jobId}</Text>
          <Text style={styles.field}>Job Term:</Text>
          <Text style={styles.fieldValue}>{this.props.job.term}</Text>
          <Text style={styles.field}>Job Round:</Text>
          <Text style={styles.fieldValue}>{this.props.job.openForRound}</Text>
          <Text style={styles.field}>Number of positions:</Text>
          <Text style={styles.fieldValue}>
            {this.props.job.numberOfPositions}
          </Text>
          <Text style={styles.field}>Title</Text>
          <Text style={styles.fieldValue}>{this.props.job.englishTitle}</Text>
          <Text style={styles.field}>Organization</Text>
          <Text style={styles.fieldValue}>{this.props.job.organization}</Text>
        </View>
        <Text style={styles.subtitle}>Details</Text>
        <View style={styles.container}>
          <Text style={styles.field}>Job status:</Text>
          <Text style={styles.fieldValue}>{this.props.job.status}</Text>
          <Text style={styles.field}>Duration (months):</Text>
          <Text style={styles.fieldValue}>{this.props.job.duration}</Text>
          <Text style={styles.field}>Salary:</Text>
          <Text style={styles.fieldValue}>{this.props.job.salary}</Text>
        </View>
        <Text style={styles.subtitle}>Description</Text>
        <View style={styles.container}>
          <Text style={styles.fieldValue}>
            {this.props.job.englishDescription}
          </Text>
        </View>
        <Text style={styles.subtitle}>Job Qualification</Text>
        <View style={styles.container}>
          <Text style={styles.field}>Job Language:</Text>
          <Text style={styles.fieldValue}>{this.props.job.language}</Text>
          <Text style={styles.field}>Security Clearence:</Text>
          <Text style={styles.fieldValue}>
            {this.props.job.securityClearance}
          </Text>
          <Text style={styles.field}>Minimum CGPA:</Text>
          <Text style={styles.fieldValue}>{this.props.job.minimumCPGA}</Text>
          <Text style={styles.field}>Preferred Program of Studies:</Text>
          <Text style={styles.fieldValue}>
            {this.props.job.preferredProgramsOfStudy.join(", ")}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.applyToJob}
            title="Apply"
          >
            <Text style={styles.applyButton}>APPLY</Text>
          </TouchableOpacity>

          {this.props.applicationSuccessful && (
            <Text style={styles.centerMsg}>Application successful</Text>
          )}
          {this.props.applicationFailed && (
            <Text style={styles.centerMsg}>{this.props.error.message}</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  subtitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#a9343a"
  },
  container: {
    padding: 10
  },
  field: {
    fontSize: 16,
    fontWeight: "bold"
  },
  fieldValue: {
    fontSize: 15
  },
  buttonContainer: {
    margin: 50,
    borderRadius: 15,
    backgroundColor: "#d8d8d8",
    padding: 15
  },
  applyButton: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#a9343a"
  },
  centerMsg: {
    padding: 5,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    margin: 2
  }
};
