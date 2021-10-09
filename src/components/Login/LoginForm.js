import { useState } from "react";
import Button from "../UI/Button";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
    if (usernameTouched) {
      if (event.target.value.trim().length === 0) {
        setUsernameValid(false);
      } else {
        setUsernameValid(true);
      }
    }
  };

  const usernameBlurHandler = () => {
    setUsernameTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    if (passwordTouched) {
      if (event.target.value.trim().length < 8) {
        setPasswordValid(false);
      }
    }
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const formIsValid = usernameValid && passwordValid;

  return (
    <form>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="username"
        name="username"
        id="username"
        onChange={usernameChangeHandler}
        onBlur={usernameBlurHandler}
        value={enteredUsername}
        maxLength="16"
        className={usernameValid ? "" : classes["invalid"]}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        value={enteredPassword}
        maxLength="12"
        className={passwordValid ? "" : classes["invalid"]}
      />
      <Button class="main" text="Login" />
    </form>
  );
};

export default LoginForm;
