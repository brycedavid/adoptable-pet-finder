// App.js
// This is the main component of the application. Within this component, all other components are rendered as children.
// This component handles the logging in and out states to render the login modal, as well as the signup page redirects
// and search capabilities. It also manages routing for the entire application.

import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import AdoptionCenters from "./pages/AdoptionCenters";
import AdoptablePets from "./pages/AdoptablePets";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import ModalOverlay from "./components/common/ModalOverlay";

import {
  homeUrl,
  adoptionCentersUrl,
  adoptablePetsUrl,
  aboutUrl,
} from "./shared/constants";
import AdoptablePetInfo from "./pages/AdoptablePetInfo";

const App = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const authCtx = useContext(AuthContext);

  // Check if the user has an authentication token stored in the context
  const isAuthenticated = !!authCtx.token;

  // Start the login flow
  const startLoginHandler = () => {
    disableScrolling();
    setIsLoggingIn(true);
  };

  // Log user out by calling context
  const logoutHandler = () => {
    authCtx.logout();
  };

  // Redirect to the signup page
  const startSignupHandler = () => {
    disableScrolling();
    setIsSigningUp(true);
  };

  // Upon closing modal, login flow ends
  const closeModalHandler = () => {
    enableScrolling();
    setIsLoggingIn(false);
    setIsSigningUp(false);
  };

  const disableScrolling = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScrolling = () => {
    document.body.removeAttribute("style");
  };

  return (
    <Layout>
      {isLoggingIn && (
        <ModalOverlay closeModal={closeModalHandler} modalType="login" />
      )}
      {isSigningUp && (
        <ModalOverlay closeModal={closeModalHandler} modalType="signup" />
      )}
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={startLoginHandler}
        onLogout={logoutHandler}
        onSignup={startSignupHandler}
      />
      <Navbar />
      <Switch>
        <Route path={homeUrl} exact>
          <Home />
        </Route>
        <Route path={adoptionCentersUrl}>
          <AdoptionCenters />
        </Route>
        <Route path={adoptablePetsUrl}>
          <AdoptablePets />
        </Route>
        <Route path={aboutUrl}>
          <About />
        </Route>
        <Route path="/pets/:petId">
          <AdoptablePetInfo />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
