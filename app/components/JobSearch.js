import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import MultiSelect from "./MultiSelect";
import Icon from "react-native-vector-icons/Ionicons";

export default class JobSearch extends React.Component {
  state = {
    programOfStudySelection: null,
    programOfStudyText: null,
    organization: null,
    title: null,
    number: null,
    city: null,
    country: null,
    stateOrProvince: null,
    postedFrom: null,
    postedTo: null
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.formView}>
          <Text style={styles.label}>Program(s) of Study</Text>
          <MultiSelect
            data={myData}
            defaultSelection={this.state.programOfStudySelection}
            onSelectionComplete={this._onChooseProgramOfStudy}
            doneButtonText="Done"
            displayComponent={() => (
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.textInput}
                value={this.state.programOfStudyText}
              />
            )}
          />

          <Text style={styles.label}>Organization</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.organization}
            onChangeText={organization => this.setState({ organization })}
          />

          <Text style={styles.label}>Job Title</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />

          <Text style={styles.label}>Job Number</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            keyboardType="numeric"
            value={this.state.number}
            onChangeText={number => this.setState({ number })}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
          />

          <Text style={styles.label}>Country</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.country}
            onChangeText={country => this.setState({ country })}
          />

          <Text style={styles.label}>
            State/Province (Only for Canada or USA)
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.stateOrProvince}
            onChangeText={stateOrProvince => this.setState({ stateOrProvince })}
          />

          <Text style={styles.label}>Posted From</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.postedFrom}
            onChangeText={postedFrom => this.setState({ postedFrom })}
          />

          <Text style={styles.label}>Posted To</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={this.state.postedTo}
            onChangeText={postedTo => this.setState({ postedTo })}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={this._saveOnPress}>
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this._loadOnPress}>
              <Text style={styles.buttonText}>LOAD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this._searchOnPress}
            >
              <Icon name={"ios-search"} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  _searchOnPress = () => {
    const searchParams = {};
    Object.entries(this.state).forEach(([k, v]) => {
      if (v) {
        searchParams[k] = v;
      }
    });
    if (searchParams.programOfStudySelection) {
      searchParams.programsOfStudy = [
        ...searchParams.programOfStudySelection.values()
      ];
    }
    delete searchParams.programOfStudySelection;
    delete searchParams.programOfStudyText;

    this.props.setSearchParamsDispatch(searchParams);
    this.props.navigation.navigate("SearchResult");
  };

  _saveOnPress = () => {
    const searchParam = {};
    Object.entries(this.state).forEach(([k, v]) => {
      if (v) {
        searchParam[k] = v;
      }
    });
    this.props.savePrefDispatch(searchParam);
  };

  _loadOnPress = () => {
    this.setState(this.props.searchPref);
  };

  _onChooseProgramOfStudy = selection => {
    this.setState({ programOfStudySelection: selection }, () => {
      let programOfStudyText = selection.values().next().value;
      if (selection.size > 1) {
        programOfStudyText += ", ...";
      }
      this.setState({ programOfStudyText });
    });
  };
}

const styles = StyleSheet.create({
  formView: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  label: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    color: "gray",
    fontSize: 12
  },
  textInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 18
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 5
  },
  button: {
    width: "32%",
    height: 50,
    backgroundColor: "#a9343a",
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  icon: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  }
});

const myData = new Map([
  [1, "computer engineering"],
  [7, "software engineering"],
  [4, "international law"],
  [6, "biotechnology"],
  [2, "chemistry"],
  [12, "ancient history"],
  [42, "world literature"],
  [13, "Law -> International Law"],
  [41, "Science -> Biology"],
  [55, "Very long title that goes on for ever and ever and ever and never ends"]
]);

const countryList = new Map([
  ["canada", "Canada"],
  ["us", "United States"],
  ["uk", "United Kingdom"]
]);
