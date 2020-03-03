import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Linking } from "expo";
import Hyperlink from "react-native-hyperlink";
import Field from "./Field";
import { PROFILE_URI } from "../utils/constants";

export default class Profile extends React.Component {
  downloadResume = () => {
    //this just opens the browser with the given url which downloads the file
    //to download the link directly (i.e. to download folder) we have to eject project
    Linking.openURL(PROFILE_URI + "/7680262/resume");
  };

  render() {
    const { isFetching, errorOccurred, studentProfile } = this.props;
    if (errorOccurred) {
      return (
        <View>
          <Text>There was an error getting your profile:</Text>
          <Text>{this.props.error.message}</Text>
        </View>
      );
    }
    if (isFetching || !studentProfile) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    }

    const { address } = studentProfile;
    const { street, city, stateOrProvince, country, postalCode } =
      address || {};
    return (
      <ScrollView style={styles.profileContainer}>
        <Text style={styles.subtitle}>Personal Information</Text>
        <View style={styles.container}>
          <Field field="Student Number" fieldValue={studentProfile.studentId} />
          <Field
            field="Program of Studies"
            fieldValue={studentProfile.programOfStudy}
          />
        </View>
        <View style={styles.container}>
          <Field field="Title" fieldValue={studentProfile.title} />
          <Field field="First Name" fieldValue={studentProfile.firstName} />
          <Field field="Last Name" fieldValue={studentProfile.lastName} />
          <Field field="Gender" fieldValue={studentProfile.gender} />
        </View>
        <View style={styles.conatiner}>
          <Field field="Language" fieldValue={studentProfile.language} />
          <Field field="Citizenship" fieldValue={studentProfile.citizenship} />
        </View>
        <View style={styles.container}>
          <Field field="Accessibility" fieldValue="No" />
          <Field
            field="Resume"
            fieldValue={
              <TouchableOpacity onPress={this.downloadResume}>
                <Text style={styles.link}>Download</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <Text style={styles.subtitle}>Contact Information</Text>
        <Field field="Email" fieldValue={studentProfile.email} />
        <Field
          field="LinkedIn"
          fieldValue={
            <Hyperlink linkDefault={true}>
              <Text style={styles.link}>{studentProfile.linkedIn}</Text>
            </Hyperlink>
          }
        />
        <Field field="Skype Username" fieldValue={studentProfile.skype} />
        <Field field="Phone Number" fieldValue={studentProfile.phoneNumber} />
        <Field
          field="Address"
          fieldValue={
            address &&
            `${street},
${city} ${stateOrProvince}, ${postalCode}`
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {},
  subtitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#a9343a"
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 18
  }
});
