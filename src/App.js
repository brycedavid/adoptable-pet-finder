// App.js
// This is the main component of the application. Within this component, all other components are rendered as children.
// This component handles the logging in and out states to render the login modal, as well as the signup page redirects
// and search capabilities. It also manages routing for the entire application.

import React, { useContext, useState } from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import AdoptionCenters from "./pages/AdoptionCenters";
import AdoptablePets from "./pages/AdoptablePets";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import ModalOverlay from "./components/UI/ModalOverlay";

const App = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  // Check if the user has an authentication token stored in the context
  const isAuthenticated = !!authCtx.token;

  // Start the login flow
  const startLoginHandler = () => {
    setIsLoggingIn(true);
  };

  // Log user out by calling context
  const logoutHandler = () => {
    authCtx.logout();
  };

  // Redirect to the signup page
  const startSignupHandler = () => {
    setIsSigningUp(true);
  };

  // Upon closing modal, login flow ends
  const closeModalHandler = () => {
    setIsLoggingIn(false);
    setIsSigningUp(false);
  };

  // Forward the search data from the SearchForm (on Home page) to child components by setting searchData state
  const forwardData = (data) => {
    setSearchData(data);
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
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home forwardFormData={forwardData} />
        </Route>
        <Route path="/adoption-centers">
          <AdoptionCenters searchData={searchData} />
        </Route>
        <Route path="/adoptable-pets">
          <AdoptablePets
            forwardFormData={forwardData}
            searchData={searchData}
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
