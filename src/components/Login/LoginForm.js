// LoginForm.js
// This form is rendered as a child of the ModalOverlay component in LoginModal.js.
// It handles all user login logic, including making API requests for logging in
// and validating user input.

import { Fragment, useContext, useState } from "react";

import AuthContext from "../../store/auth-context";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const authCtx = useContext(AuthContext);

  let formIsValid = false;

  // If the email and password inputs have been changed and their values
  // are valid, the form is valid.
  if (emailValid && passwordValid && emailChanged && passwordChanged) {
    formIsValid = true;
  }

  // Sends API request for login
  const sendRequest = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCT7FuvqHq8fPhrdZHpdqEUL87GJ7TpC_Q",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // If the response isn't valid...
    if (!response.ok) {
      alert("Something went wrong... failed to login.");
      // throw new Error("Something went wrong!");
      return;
    }

    // Convert response to json
    const responseData = await response.json();

    authCtx.login(responseData.idToken);

    // Execute onLogin
    props.onLogin();
  };

  // On every change to the email input, verify that the value is valid.
  const emailChangeHandler = (event) => {
    setEmailChanged(true);
    setEnteredEmail(event.target.value);
    if (event.target.value.trim().length === 0) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  // When the email input is blurred...
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  // On every change to the password input, verify that the value is valid.
  const passwordChangeHandler = (event) => {
    setPasswordChanged(true);
    setEnteredPassword(event.target.value);
    if (event.target.value.trim().length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  // When the password input is blurred...
  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  // Upon login, send API request
  const loginHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    sendRequest();
  };

  return (
    <Fragment>
      {/* <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? Any entered data will be lost."
        }
      /> */}
      {/* <form onSubmit={loginHandler} onFocus={formFocusedHandler}> */}
      <form onSubmit={loginHandler}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          maxLength="20"
          className={emailTouched && !emailValid ? classes["invalid"] : ""}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          maxLength="15"
          className={
            passwordTouched && !passwordValid ? classes["invalid"] : ""
          }
        />
        <button disabled={!formIsValid}>Login</button>
        {/* <button disabled={!formIsValid} onClick={finishedEnteringHandler}>
          Login
        </button> */}
      </form>
    </Fragment>
  );
};

export default LoginForm;
