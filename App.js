import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import RootNavigator from "./app/config/routes";
import { rootReducer } from "./app/redux/index";

export default class App extends React.Component {
  store = createStore(rootReducer, applyMiddleware(thunk, logger));

  render() {
    return (
      <Provider store={this.store}>
        <RootNavigator />
      </Provider>
    );
  }
}
