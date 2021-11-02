// LoginForm.js
// This form is rendered as a child of the ModalOverlay component in LoginModal.js.
// It handles all user login logic, including making API requests for logging in
// and validating user input.

import { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router";

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
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  let formIsValid = false;

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

    // Convert response to json
    const responseData = await response.json();

    setIsLoading(false);

    // If the response isn't valid...
    if (!response.ok) {
      if (responseData.error.message === "EMAIL_NOT_FOUND") {
        alert(
          "There is no account corresponding to the entered email; Try another email address."
        );
      } else if (responseData.error.message === "INVALID_PASSWORD") {
        alert("The entered password is invalid.");
      } else if (responseData.error.message === "USER_DISABLED") {
        alert("This user account has been disabled by an administrator");
      } else {
        alert("Something went wrong... failed to login.");
      }
      // throw new Error("Something went wrong!");
      return;
    }

    authCtx.login(responseData.idToken);

    // Execute onLogin
    props.onLogin();
    history.push("/home");
  };

  // If the email and password inputs have been changed and their values
  // are valid, the form is valid.
  if (emailValid && passwordValid && emailChanged && passwordChanged) {
    formIsValid = true;
  }

  // On every change to the email input, verify that the value is valid.
  const emailChangeHandler = (event) => {
    setEmailChanged(true);
    setEnteredEmail(event.target.value);
    if (event.target.value.trim().length === 0) {
      setEmailValid(false);
      setEmailError("Please enter an email");
    } else if (!event.target.value.trim().includes("@")) {
      setEmailValid(false);
      setEmailError("Email must include an @");
    } else {
      setEmailValid(true);
      setEmailError(null);
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
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordValid(true);
      setPasswordError(null);
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
          className={emailTouched && !emailValid ? classes["invalid"] : ""}
        />
        {emailError && emailTouched && (
          <p className={classes["error-message"]}>{emailError}</p>
        )}
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          className={
            passwordTouched && !passwordValid ? classes["invalid"] : ""
          }
        />
        {passwordError && passwordTouched && (
          <p className={classes["error-message"]}>{passwordError}</p>
        )}
        <button disabled={!formIsValid}>Login</button>
        {/* <button disabled={!formIsValid} onClick={finishedEnteringHandler}>
          Login
        </button> */}
      </form>
    </Fragment>
  );
};

export default LoginForm;
