import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";

import { authActions } from "./components/store/auth-slice";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
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
      <Route path="/home">
        <Home />
      </Route>
    </Fragment>
  );
}

export default App;
