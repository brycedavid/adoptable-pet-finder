import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { FilterResultsContextProvider } from "./store/filter-results-context";

import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <FilterResultsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FilterResultsContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
