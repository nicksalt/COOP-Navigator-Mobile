import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class SimpleTableRow extends React.Component {
  render() {
    if (this.props.isHeader) {
      return (
        <View style={[style.parentView, { marginTop: 0, marginBottom: 0 }]}>
          <Text style={[style.row, style.header, { flex: 1 }]}>Id</Text>
          <Text style={[style.row, style.header]}>Job Title</Text>
          <Text style={[style.row, style.header]}>City</Text>
        </View>
      );
    }

    return (
      <View style={style.parentView}>
        <Text style={[style.row, { flex: 1 }]}>{this.props.rowInfo.key}</Text>
        <Text style={style.row}>{this.props.rowInfo.jobTitle}</Text>
        <Text style={style.row}>{this.props.rowInfo.city}</Text>
      </View>
    );
  }
}

SimpleTableRow.propTypes = {
  isHeader: PropTypes.bool,
  rowInfo: PropTypes.any
};

const style = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#4f65cb",
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8
  },
  row: {
    textAlign: "center",
    fontSize: 15,
    flex: 2
  },
  parentView: {
    flex: 1,
    width: "96%",
    flexDirection: "row",
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "5%",
    marginBottom: "5%"
  }
});
