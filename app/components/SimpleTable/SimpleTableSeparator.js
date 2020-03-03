import React from "react";
import { View } from "react-native";

export default class SimpleTableSeparator extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 1,
          width: "96%",
          backgroundColor: "#acadaa",
          marginLeft: "2%",
          marginRight: "2%"
        }}
      />
    );
  }
}
