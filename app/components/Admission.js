import React from "react";
import { View, Button, ScrollView, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import CheckBox from "react-native-check-box";

export default class Admission extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      studentAnswerText: "N/A",
      disabled: false
    };
  }
  updateTerms = () => {
    if (this.state.checked) {
      this.setState({
        checked: true,
        studentAnswerText: "Accepted",
        disabled: true
      });
    } else {
      this.refs.toast.show("Must accept Terms & Conditions");
    }
  };
  render() {
    return (
      <ScrollView>
        <Text style={styles.subtitle}>Enrollment Details</Text>
        <View style={styles.container}>
          <Text style={styles.field}>{"You're currently registered in:"}</Text>
          <Text style={styles.fieldValue}>
            Bachelor of Applied Science Software Engineering (Co-op)
          </Text>
          <Text style={styles.field}>Your current CO-OP status is:</Text>
          <Text style={styles.fieldValue}>Admitted</Text>
          <Text style={styles.field}>First expected work term:</Text>
          <Text style={styles.fieldValue}>2015, Summer</Text>
          <Text style={styles.field}>Special condition of admission:</Text>
          <Text style={styles.fieldValue}>
            Must maintain a minimum CGPA of 4.5. Must complete all courses
            currently registered 2014-2015. 14/10/07 TN
          </Text>
          <Text style={styles.fieldValueBlock}>
            Please note that this admission offer is CONDITIONAL.
          </Text>
          <Text style={styles.fieldValueBlock}>
            To Keep your spot in CO-OP:
          </Text>
          <Text style={styles.fieldValue}>
            1) You Need to attend the first mandatory workshop before accepting
            your offer of admission. If you miss the first workshop, your offer
            of admission may be revoked. {"\n"}
            {"\n"}
            2) Your CGPA must be above the minimum required CGPA for your
            program following the current study semester.
          </Text>
        </View>
        <Text style={styles.subtitle}>Confirming Participation</Text>
        <View style={styles.container}>
          <Text style={[styles.field, styles.studentAnswer]}>
            {this.state.studentAnswerText}
          </Text>
          <View style={styles.checkBoxLayout}>
            <CheckBox
              isChecked={this.state.checked}
              onClick={() => this.setState({ checked: !this.state.checked })}
              disabled={this.state.disabled}
            />
            <Text style={styles.checkBoxfieldValue}>
              *I have read the CO-OP Admission Agreement and agree to comply
              with the terms and conditions.
            </Text>
          </View>
          <Toast ref="toast" />
          <TouchableOpacity
            style={[
              !this.state.disabled && styles.buttonContainer,
              this.state.disabled && styles.buttonContainerDisabled
            ]}
            onPress={this.updateTerms}
            title="Accept"
            disabled={this.state.disabled}
          >
            <Text style={styles.acceptButton}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 10
  },
  subtitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#a9343a"
  },
  field: {
    fontSize: 16,
    fontWeight: "bold"
  },
  fieldValue: {
    fontSize: 15,
    paddingBottom: 10
  },
  fieldValueBlock: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10
  },
  studentAnswer: {
    textAlign: "center"
  },
  checkBoxLayout: {
    flexDirection: "row"
  },
  checkBoxfieldValue: {
    flex: 1,
    flexWrap: "wrap"
  },
  buttonContainer: {
    margin: 50,
    backgroundColor: "#d8d8d8",
    borderRadius: 15,
    padding: 15
  },
  buttonContainerDisabled: {
    margin: 50,
    backgroundColor: "hsl(0,25%,90%)",
    borderRadius: 15,
    padding: 15
  },
  acceptButton: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#a9343a"
  }
};
