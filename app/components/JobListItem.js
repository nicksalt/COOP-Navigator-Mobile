import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

export default class JobListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this._itemOnClick}>
        <View style={styles.parentView}>
          <View>
            <Text style={styles.heading}>
              {this.props.job.organization}
              {"\n"}
            </Text>
            <Text style={styles.subHeading}>
              {this.props.job.englishTitle}
              {"\n"}
            </Text>
            <Text style={styles.jobid}>
              {"Job ID: " + this.props.job.jobId}
            </Text>
          </View>
          <View style={styles.chevronContainer}>
            <Icon name="ios-arrow-forward" style={styles.chevron} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _itemOnClick = () => {
    this.props.fetchSingleJobDispatch(this.props.job.jobId);
    this.props.navigation.navigate("JobSummary");
  };
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
  parentView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  header: {},
  heading: {
    color: "#a9343a",
    fontSize: 18
  },
  subHeading: {
    fontSize: 18,
    flexDirection: "row"
  },
  jobid: {
    fontSize: 12,
    color: "gray"
  },
  chevronContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  chevron: {
    fontSize: 25,
    paddingRight: 8,
    color: "#868686",
    justifyContent: "flex-end"
  }
});
