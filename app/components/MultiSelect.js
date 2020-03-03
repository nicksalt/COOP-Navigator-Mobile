import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

/**
 * A multi-select form elements. Opens a dialog box which allows user to select multiple items.
 * You must pass:
 *
 * @param data - a Map<any, string> of key,value pairs, each string value in the Map is printed as an option
 * @param onSelectionComplete - called when user finishes selection, passed a Map<any, string> of selected data items
 * @defaultSelection - a Map of options that will be pre-selected
 * @doneButtonText - (optional) a string for the OK button text that closes dialog box, default to Okay
 * @param displayComponent - (optional) function that returns component that opens the dialog box
 * @param modalStyle - (optional) the style object for the modal box
 */
export default class MultiSelect extends React.Component {
  state = { selected: new Map(), isModalVisible: false };

  componentWillReceiveProps = nextProps => {
    //if defaultSelection was passed, we must set state to match
    if (nextProps.defaultSelection) {
      this.setState({ selected: new Map(nextProps.defaultSelection) });
    }
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id, title) => {
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.set(id, title);
      }
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MultiSelectItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  _defaultDisplayComponent = () => {
    return (
      <TouchableOpacity onPress={this._toggleModal}>
        <View
          pointerEvents="none" //Need View with pointerEvents, bug in RN: https://github.com/facebook/react-native/issues/14958
        >
          <TextInput
            style={styles.defaultComponentText}
            defaultValue="Click To Choose"
            editable={false}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _deselectAll = () => {
    this.setState({ selected: new Map() });
  };

  _listSeparator = () => {
    return <View style={styles.listSeparator} />;
  };

  _onModalClose = () => {
    this.props.onSelectionComplete(new Map(this.state.selected));
    this._toggleModal();
  };

  render = () => {
    const flatListData = [];
    for (let [id, title] of this.props.data) {
      flatListData.push({ id, title });
    }

    return (
      <View>
        <TouchableOpacity onPress={this._toggleModal}>
          <View
            pointerEvents="none" //Need View with pointerEvents, bug in RN: https://github.com/facebook/react-native/issues/14958
          >
            {this.props.displayComponent
              ? this.props.displayComponent()
              : this._defaultDisplayComponent()}
          </View>
        </TouchableOpacity>
        <Modal
          visible={this.state.isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={this._onModalClose}
        >
          <View style={styles.modalContainerStyle}>
            <View style={this.props.modalStyle || styles.defaultModalStyle}>
              <FlatList
                data={flatListData}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._listSeparator}
              />
              <View style={styles.buttonsView}>
                <Button
                  title="Deselect All"
                  color="#ff6060"
                  onPress={this._deselectAll}
                />
                <Button
                  title={this.props.doneButtonText || "Done"}
                  onPress={this._onModalClose}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
}

MultiSelect.propTypes = {
  data: PropTypes.instanceOf(Map),
  onSelectionComplete: PropTypes.func.isRequired,
  defaultSelection: PropTypes.object,
  displayComponent: PropTypes.func,
  doneButtonText: PropTypes.string,
  modalStyle: PropTypes.object
};

class MultiSelectItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id, this.props.title);
  };

  render = () => {
    const iconName = this.props.selected
      ? "checkbox-marked-outline"
      : "checkbox-blank-outline";
    const iconColor = this.props.selected ? "#8f001a" : "#000";
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.listItem}>
        <View>
          <MaterialCommunityIcons name={iconName} size={30} color={iconColor} />
        </View>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  modalContainerStyle: {
    justifyContent: "center",
    height: "100%"
  },
  defaultModalStyle: {
    backgroundColor: "white",
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  listItem: {
    flexDirection: "row",
    padding: 6
  },
  listItemTextContainer: {
    flex: 1
  },
  listItemText: {
    fontSize: 20,
    paddingLeft: 8,
    paddingTop: 3
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6
  },
  defaultComponentText: {
    color: "#AAA"
  },
  listSeparator: {
    height: 1,
    width: "96%",
    backgroundColor: "#acadaa",
    marginLeft: "2%",
    marginRight: "2%"
  }
});
