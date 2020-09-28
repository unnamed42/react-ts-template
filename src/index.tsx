import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "@/plugins";
import { store } from "@/redux";
import { Routes } from "./routes";

render(
  <Provider store={store}>
    <Routes />
  </Provider>
  , document.getElementById("root"));
