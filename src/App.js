import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Header isAuthenticated={isAuthenticated} />
      <Navbar />
      <Home />
    </Fragment>
  );
}

export default App;
