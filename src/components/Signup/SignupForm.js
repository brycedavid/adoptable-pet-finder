// SignupForm.js
// This component is rendered as a child on the Signup page.
// It renders a signup form and handles user signup logic.
// It makes an API request and stores user signup information
// to a firebase DB, which is used for login functionality.
// If a user has signed up, the user can login. Otherwise, they can't.

import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const authCtx = useContext(AuthContext);

  // On each change to email input...
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  // On each change to password input...
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  // Upon submitting the form with valid data, store user info to firebase.
  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest();
  };

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
    setIsLoading(false);

    // If the response is invalid...
    if (!response.ok) {
      alert("Something went wrong...failed to signup.");
      // throw new Error("Something went wrong!");
      return;
    }

    // Convert to json object
    const responseData = await response.json();

    // Login the user automatically upon account creation
    authCtx.login(responseData.idToken);

    // Call method to wrap up signup flow
    props.finishSignup();
  };

  return (
    <form onSubmit={submitHandler} className={classes["signup-form"]}>
      <input
        type="email"
        name="email"
        id="email"
        onChange={emailChangeHandler}
        value={enteredEmail}
        maxLength="20"
      />
      <input
        type="password"
        name="password"
        id="password"
        onChange={passwordChangeHandler}
        maxLength="15"
        value={enteredPassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
