import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./LoginForm.module.css";

import { authActions } from "../store/auth-slice";

const LoginForm = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const dispatch = useDispatch();

  let formIsValid = false;

  if (usernameValid && passwordValid && usernameChanged && passwordChanged) {
    formIsValid = true;
  }

  const usernameChangeHandler = (event) => {
    setUsernameChanged(true);
    setEnteredUsername(event.target.value);
    if (event.target.value.trim().length === 0) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }
  };

  const usernameBlurHandler = () => {
    setUsernameTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setPasswordChanged(true);
    setEnteredPassword(event.target.value);
    if (event.target.value.trim().length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    props.onLogin();
    dispatch(authActions.login());
  };

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
        className={usernameTouched && !usernameValid ? classes["invalid"] : ""}
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
        className={passwordTouched && !passwordValid ? classes["invalid"] : ""}
      />
      <button disabled={!formIsValid} onClick={loginHandler}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
