// SignupForm.js
// This component is rendered as a child on the Signup page.
// It renders a signup form and handles user signup logic.
// It makes an API request and stores user signup information
// to a firebase DB, which is used for login functionality.
// If a user has signed up, the user can login. Otherwise, they can't.

import { useContext, useState } from "react";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";

import classes from "./SignupForm.module.css";

import AuthContext from "../../store/auth-context";
import LoadingIndicator from "../UI/LoadingIndicator";
import Backdrop from "../UI/Backdrop";

const SignupForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailInputError, setEmailInputError] = useState(null);
  const [passwordInputError, setPasswordInputError] = useState(null);
  const [requestError, setRequestError] = useState(null);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  let formIsValid = false;

  // This async method sends a POST request to our firebase DB, which stores user
  // authentication information.
  const sendRequest = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCT7FuvqHq8fPhrdZHpdqEUL87GJ7TpC_Q",
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
    // Convert to json object
    const responseData = await response.json();

    setIsLoading(false);

    // If the response is invalid...
    if (!response.ok) {
      console.log(responseData);

      if (responseData.error.message === "EMAIL_EXISTS") {
        setRequestError(
          "The email you are attempting to use is already in use by another account."
        );
      } else if (responseData.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        setRequestError("Too many signup attempts... try again later");
      } else {
        setRequestError("Something went wrong...failed to signup.");
      }
      return;
    }

    // Login the user automatically upon account creation
    authCtx.login(responseData.idToken);

    // Call method to wrap up signup flow
    props.onSignup();
    history.pushState("/home");
  };

  // If the email and password inputs have been changed and their values
  // are valid, the form is valid.
  if (emailValid && passwordValid && emailChanged && passwordChanged) {
    formIsValid = true;
  }

  // On each change to email input...
  const emailChangeHandler = (event) => {
    setEmailChanged(true);
    setEnteredEmail(event.target.value);
    if (requestError) {
      setRequestError(null);
    }
    if (event.target.value.trim().length === 0) {
      setEmailValid(false);
      setEmailInputError("Please enter an email");
    } else if (!event.target.value.trim().includes("@")) {
      setEmailValid(false);
      setEmailInputError("Email must include an @");
    } else {
      setEmailValid(true);
      setEmailInputError(null);
    }
  };

  // When the email input is blurred...
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  // On each change to password input...
  const passwordChangeHandler = (event) => {
    setPasswordChanged(true);
    setEnteredPassword(event.target.value);
    if (requestError) {
      setRequestError(null);
    }
    if (event.target.value.trim().length < 8) {
      setPasswordValid(false);
      setPasswordInputError("Password must be at least 8 characters");
    } else {
      setPasswordValid(true);
      setPasswordInputError(null);
    }
  };

  // When the password input is blurred...
  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  // Upon submitting the form with valid data, store user info to firebase.
  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    sendRequest();
  };

  if (isLoading) {
    return (
      <div className="loading-indicator-container">
        <LoadingIndicator />
        {ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop-root")
        )}
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} className={classes["signup-form"]}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          className={
            emailTouched && !emailValid ? "form-input invalid " : "form-input"
          }
        />
        {emailInputError && emailTouched && (
          <p className="error-message">{emailInputError}</p>
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
            passwordTouched && !passwordValid
              ? "form-input invalid "
              : "form-input"
          }
        />
        {passwordInputError && passwordTouched && (
          <p className="error-message">{passwordInputError}</p>
        )}
        <button
          type="submit"
          disabled={!formIsValid}
          className={formIsValid ? "button-main" : "button-main disabled"}
        >
          Submit
        </button>
      </form>
      {requestError && <p className="error-message">{requestError}</p>}
    </div>
  );
};

export default SignupForm;
