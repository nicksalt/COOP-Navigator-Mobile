import { AsyncStorage } from "react-native";

export const AUTO_LOGIN = "auth-auto-login";
export const USER_EMAIL = "auth-user-email";
export const USER_PASSWORD = "auth-user-password";

export function saveLogin(email, password) {
  return Promise.all([
    AsyncStorage.setItem(USER_EMAIL, email),
    AsyncStorage.setItem(USER_PASSWORD, password)
  ]);
}

export function forgetLogin() {
  return Promise.all([
    AsyncStorage.removeItem(USER_EMAIL),
    AsyncStorage.removeItem(USER_PASSWORD)
  ]);
}

export function getLoginInfo() {
  return Promise.all([
    AsyncStorage.getItem(USER_EMAIL),
    AsyncStorage.getItem(USER_PASSWORD)
  ]).then(values => {
    return {
      email: values[0],
      password: values[1]
    };
  });
}

export function getAutoLogin() {
  return AsyncStorage.getItem(AUTO_LOGIN).then(value => !!value);
}

export function setAutoLogin(value) {
  if (value) {
    return AsyncStorage.setItem(AUTO_LOGIN, value + "");
  } else {
    return AsyncStorage.removeItem(AUTO_LOGIN);
  }
}
