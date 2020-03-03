import React from "react";
import { FlatList } from "react-native";
import SimpleTableRow from "./SimpleTableRow";
import SimpleTableSeparator from "./SimpleTableSeparator";
import PropTypes from "prop-types";

//Note the files in the /app/components directory are Presentational only.
//They do not have app logic. The app logic is in the equivalent file in /app/containers
export default class SimpleTable extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        ListHeaderComponent={() => <SimpleTableRow isHeader={true} />}
        renderItem={({ item }) => <SimpleTableRow rowInfo={item} />}
        ItemSeparatorComponent={() => <SimpleTableSeparator />}
      />
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.array.isRequired
};
