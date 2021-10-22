import React, { Fragment, useContext, useState } from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/Login/LoginModal";
import Home from "./pages/Home";
import AdoptionCenters from "./pages/AdoptionCenters";
import AdoptablePets from "./pages/AdoptablePets";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const isAuthenticated = !!authCtx.token;

  const startLoginHandler = () => {
    setIsLoggingIn(true);

    // Once logged in, redirect to Home page
    history.push("/home");
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const startSignupHandler = () => {
    history.push("/signup");
  };

  const finishSignupHandler = () => {
    history.push("/home");
  };

  const closeModalHandler = () => {
    setIsLoggingIn(false);
  };

  const forwardData = (data) => {
    setSearchData(data);
  };

  return (
    <Fragment>
      {isLoggingIn && <LoginModal closeModal={closeModalHandler} />}
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
          <AdoptablePets searchData={searchData} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/signup">
          <SignUp finishSignup={finishSignupHandler} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
