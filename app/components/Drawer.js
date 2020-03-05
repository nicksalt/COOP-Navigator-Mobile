import React from "react";
import {
  Button,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import { DrawerItems } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setAutoLogin, forgetLogin } from "../config/auth";

export default class Drawer extends React.Component {
  onItemPress = async args => {
    if (args.route.routeName === "Logout") {
      this.props.logoutDispatch();
      //technically in our production app, the navigation call should happen at end
      //i.e. the commented out line
      //BUT:
      //remote debugging cause AsyncStorage calls stop code execution
      //so I put the put the navigation code in a setTimeout so it always runs
      //and hope it runs after the AsyncStorage calls success or fail
      setTimeout(() => this.props.navigation.navigate("AuthScreens"), 500);
      await setAutoLogin(false);
      await forgetLogin();
      //this.props.navigation.navigate("AuthScreens")
    } else {
      this.props.onItemPress(args);
    }
  };

  renderIcon = ({ route, focused, tintColor }) => {
    let iconName;
    const { routeName } = route;
    // Nick - add comments for focused commands. No longer supported maybe?
    if (routeName === "Feed") {
      iconName = "ios-notifications"; //+ (focused ? "" : "-outline");
    } else if (routeName === "Search") {
      iconName = "ios-search"; //+ + (focused ? "" : "-outline");
    } else if (routeName === "My Applications") {
      iconName = "ios-list-box"; //++ (focused ? "" : "-outline");
    } else if (routeName === "About") {
      iconName = "ios-information-circle"; //++ (focused ? "" : "-outline");
    } else if (routeName === "Admission") {
      iconName = "ios-school"; //++ (focused ? "" : "-outline");
    } else if (routeName === "Profile") {
      iconName = "ios-person"; //+ + (focused ? "" : "-outline");
    } else if (routeName === "Logout") {
      iconName = "ios-log-out"; //++ (focused ? "" : "-outline");
    } else if (routeName === "Interviews") {
      iconName = "ios-chatbubbles"; //+ + (focused ? "" : "-outline");
    } else {
      console.log("NO custom icon");
      iconName = "ios-add"; //++ (focused ? "" : "-outline");
    }

    return (
      <Ionicons type="ionicon" name={iconName} size={25} color={tintColor} />
    );
  };

  render() {
    let name = "";
    const { studentProfile } = this.props;
    if (studentProfile) {
      name = `${studentProfile.firstName} ${studentProfile.lastName}`;
    }
    return (
      <ScrollView>
        <View style={styles.drawerHeader}>
          <Image
            source={require("../images/uOttawa-logo-white.png")}
            resizeMode="contain"
            style={styles.headerImage}
          />
          <Text style={styles.studentNameText}>{name}</Text>
        </View>
        <DrawerItems
          {...this.props}
          renderIcon={this.renderIcon}
          onItemPress={this.onItemPress}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#8f001a",
    height: 140,
    justifyContent: "center",
    padding: 20
  },
  headerImage: { width: 75, height: 50 },
  studentNameText: { color: "white", fontSize: 30 }
});
