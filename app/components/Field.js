import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class Field extends React.Component {
  render() {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.field}>{this.props.field}</Text>
        {typeof this.props.fieldValue === "string" ? (
          <Text style={styles.fieldValue}>{this.props.fieldValue}</Text>
        ) : (
          <View style={styles.fieldValueObject}>{this.props.fieldValue}</View>
        )}
      </View>
    );
  }
}

Field.propTypes = {
  fieldValue: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

const styles = StyleSheet.create({
  fieldContainer: {
    padding: 20
  },
  field: {
    color: "gray",
    fontSize: 10
  },
  fieldValue: {
    fontSize: 22,
    fontWeight: "bold"
  },
  fieldValueObject: {}
});
