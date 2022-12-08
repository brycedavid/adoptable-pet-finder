import React, { Fragment, useState } from "react";

const PasswordInput = (props) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordInputError, setPasswordInputError] = useState(null);
  const [requestError, setRequestError] = useState(null);

    // On every change to the password input, verify that the value is valid.
    const passwordChangeHandler = (event) => {
      props.setPasswordHasChanged(true);
      props.setNewPassword(event.target.value);
      setEnteredPassword(event.target.value);
      if (requestError) {
        setRequestError(null);
      }
      if (event.target.value.trim().length < 8) {
        setPasswordValid(false);
        props.setPasswordValidity(false);
        setPasswordInputError("Password must be at least 8 characters");
      } else {
        setPasswordValid(true);
        props.setPasswordValidity(true);
        setPasswordInputError(null);
      }
    };
  
    // When the password input is blurred...
    const passwordBlurHandler = () => {
      setPasswordTouched(true);
    };

    return (
      <Fragment>
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
                ? "auth-input-container__input invalid"
                : "auth-input-container__input"
            }
          />
          {passwordInputError && passwordTouched && (
            <p className="error-message__password">{passwordInputError}</p>
          )}
      </Fragment>
    );
}

export default PasswordInput;