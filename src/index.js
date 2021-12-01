import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

import App from "./App";
import store from "./store/data-redux";

ReactDOM.render(
  <AuthContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthContextProvider>,
  document.getElementById("root")
);
