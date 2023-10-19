import React from "react";
import "./index.css";
import Root from "./App";
import { hydrate, render } from "react-dom";
// Redux Import
import { store } from "./redux/store";
import { Provider } from "react-redux";

const App = (
  <Provider store={store}>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </Provider>
);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(App, rootElement);
} else {
  render(App, rootElement);
}
