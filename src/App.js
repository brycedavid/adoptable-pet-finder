import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./App.module.css";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import LoginModal from "./components/UI/LoginModal";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const startLoginHandler = () => {
    setIsLoggingIn(true);
  };

  const closeModalHandler = () => {
    setIsLoggingIn(false);
  };

  return (
    <Fragment>
      {isLoggingIn && <LoginModal closeModal={closeModalHandler} />}
      <Header isAuthenticated={isAuthenticated} onLogin={startLoginHandler} />
      <Navbar />
      <Home />
    </Fragment>
  );
}

export default App;
