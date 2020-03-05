import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedContainer from "../containers/FeedContainer";
import JobSearchContainer from "../containers/JobSearchContainer";
import JobSearchResultContainer from "../containers/JobSearchResultContainer";
import JobApplicationsContainer from "../containers/JobApplicationsContainer";
import LoginContainer, { isAuthorized } from "../containers/LoginContainer.js";
import JobSummaryContainer from "../containers/JobSummaryContainer";
import About from "../components/About";
import Admission from "../components/Admission";
import ProfileContainer from "../containers/ProfileContainer";
import InterviewsContainer from "../containers/InterviewsContainer";
import DrawerContainer from "../containers/DrawerContainer";

const LoginStackNav = createStackNavigator(
  {
    Login: {
      screen: LoginContainer,
      navigationOptions: {
        title: "Login"
      }
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null
    }
  }
);

const SearchStackNav = createStackNavigator(
  {
    Search: {
      screen: JobSearchContainer,
      navigationOptions: ({ navigation }) => ({
        title: "Search",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    },
    SearchResult: {
      screen: JobSearchResultContainer,
      navigationOptions: {
        title: "Search Results"
      }
    },
    JobSummary: {
      screen: JobSummaryContainer,
      navigationOptions: {
        title: "Job Summary"
      }
    }
  },
  {
    initialRouteName: "Search"
  }
);

const FeedStackNav = createStackNavigator(
  {
    Feed: {
      screen: FeedContainer,
      navigationOptions: ({ navigation }) => ({
        title: "Feed",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Feed"
  }
);

const JobAppsStackNav = createStackNavigator(
  {
    JobApps: {
      screen: JobApplicationsContainer,
      navigationOptions: ({ navigation }) => ({
        title: "My Applications",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    },
    JobSummary: {
      screen: JobSummaryContainer,
      navigationOptions: {
        title: "Job Summary"
      }
    }
  },
  {
    initialRouteName: "JobApps"
  }
);

const InterviewsStackNav = createStackNavigator(
  {
    Interviews: {
      screen: InterviewsContainer,
      navigationOptions: ({ navigation }) => ({
        title: "Interviews",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Interviews"
  }
);

const AdmissionStackNav = createStackNavigator(
  {
    Admission: {
      screen: Admission,
      navigationOptions: ({ navigation }) => ({
        title: "Admission",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Admission"
  }
);

const ProfileStackNav = createStackNavigator(
  {
    Profile: {
      screen: ProfileContainer,
      navigationOptions: ({ navigation }) => ({
        title: "User Profile",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Profile"
  }
);

const AboutStackNav = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        title: "About",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "About"
  }
);

const DrawerLayout = createDrawerNavigator(
  {
    Feed: {
      screen: FeedStackNav
    },
    Search: {
      screen: SearchStackNav
    },
    "My Applications": {
      screen: JobAppsStackNav
    },
    Interviews: {
      screen: InterviewsStackNav
    },
    Admission: {
      screen: AdmissionStackNav
    },
    Profile: {
      screen: ProfileStackNav
    },
    About: {
      screen: AboutStackNav
    },
    Logout: {
      screen: LoginStackNav
    }
  },
  {
    contentComponent: DrawerContainer,
    initialRouteName: "Feed",
    gesturesEnabled: false,
    backBehavior: "none",
    contentOptions: {
      activeTintColor: "#8f001a"
    }
  }
);

const RootNavigator = createSwitchNavigator(
  {
    AuthScreens: LoginStackNav,
    AppScreens: DrawerLayout
  },
  {
    initialRouteName: "AppScreens"
  }
);

export default RootNavigator;

const styles = StyleSheet.create({
  icon: {
    padding: 15
  }
});
