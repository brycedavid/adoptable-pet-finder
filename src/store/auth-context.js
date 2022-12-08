// auth-context.js
// This file manages the user authentication state using context.
// Did not use redux in order to practice using context.

import React, { useState } from "react";

// Initial context state
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  // Get the token from local storage and set the token state; if no token stored, initialize state to null.
  const initialToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const [token, setToken] = useState(initialToken);

  // If a token is present, the user should be logged in.
  const userIsLoggedIn = !!token;

  // Upon login, set the token state and store token in local storage
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Upon logout, set the token state to null and clear local storage
  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  // Update our context
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
