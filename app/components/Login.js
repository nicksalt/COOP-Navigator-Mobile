import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Switch
} from "react-native";
import {
  saveLogin,
  getAutoLogin,
  setAutoLogin,
  getLoginInfo,
  forgetLogin
} from "../config/auth";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: true,
      email: "amizo067@uottawa.ca",
      password: "lethalpassword"
    };
  }

  componentDidMount = () => {
    this.bootstrapLogin();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { rememberMe, email, password } = this.state;
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      if (rememberMe) {
        setAutoLogin(rememberMe);
        saveLogin(email, password);
      }
      this.props.navigation.navigate("AppScreens");
    }
    if (this.props.loginError) {
      await setAutoLogin(false);
      await forgetLogin();
    }
  };

  bootstrapLogin = async () => {
    try {
      console.log(
        "This print should be followed by one saying AUTOLOGIN SUCCESS." +
          "Remote debugging cases errors with AsyncStorage"
      );
      const autoLogin = await getAutoLogin();
      console.log("AUTOLOGIN SUCCESS", autoLogin);
      if (autoLogin) {
        const { email, password } = await getLoginInfo();
        if (email && password) {
          this.props.loginDispatch(email, password);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  onLoginClick = async () => {
    try {
      let { email, password } = this.state;
      email = email.toLowerCase();
      this.props.loginDispatch(email, password);
    } catch (err) {
      console.error("onLoginClick Error", err);
    }
  };

  displayError() {
    let message = " ";
    if (this.props.loginError) message = this.props.loginError.message;
    return <Text style={styles.errorMessage}>{message}</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../images/uottawa_Logo.png")}
          />
          <Text style={styles.subtitle}>Co-op</Text>
        </View>

        <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="Email"
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            underlineColorAndroid="transparent"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <View style={styles.rememberMeContainer}>
            <Switch
              style={styles.rememberMeSwitch}
              title="Remember Me"
              value={this.state.rememberMe}
              onValueChange={() =>
                this.setState({ rememberMe: !this.state.rememberMe })
              }
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onLoginClick}
            title="LOGIN"
          >
            <Text style={styles.loginButton}>LOGIN </Text>
            {this.props.attemptingLogin && (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="small" color="gray" />
              </View>
            )}
          </TouchableOpacity>

          {this.displayError()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    marginLeft: 4
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 250,
    height: 215,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "500"
  },
  loginContainer: {
    padding: 20
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10
  },
  buttonContainer: {
    backgroundColor: "#a9343a",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    textAlign: "center",
    fontWeight: "600",
    color: "white"
  },
  errorMessage: {
    textAlign: "center",
    color: "red"
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%"
  },
  rememberMeSwitch: {
    marginRight: "3%"
  },
  rememberMeText: {
    fontSize: 16
  }
});
