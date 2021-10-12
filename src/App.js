import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./components/store/auth-slice";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import LoginModal from "./components/Login/LoginModal";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const startLoginHandler = () => {
    setIsLoggingIn(true);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const closeModalHandler = () => {
    setIsLoggingIn(false);
  };

  return (
    <Fragment>
      {isLoggingIn && <LoginModal closeModal={closeModalHandler} />}
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={startLoginHandler}
        onLogout={logoutHandler}
      />
      <Navbar />
      <Home />
    </Fragment>
  );
}

export default App;
