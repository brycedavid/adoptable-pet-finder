import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Client } from "@petfinder/petfinder-js";

import { authActions } from "./components/store/auth-slice";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/Login/LoginModal";
import Home from "./pages/Home";
import AdoptionCenters from "./pages/AdoptionCenters";
import AdoptablePets from "./pages/AdoptablePets";
import About from "./pages/About";

const petFinderClient = new Client({
  apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
  secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
});

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
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <Home client={petFinderClient} />
      </Route>
      <Route path="/adoption-centers">
        <AdoptionCenters client={petFinderClient} />
      </Route>
      <Route path="/adoptable-pets">
        <AdoptablePets />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Fragment>
  );
}

export default App;
