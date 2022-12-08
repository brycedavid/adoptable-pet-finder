import React, { Fragment, useState } from "react";

const EmailInput = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailInputError, setEmailInputError] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // On every change to the email input, verify that the value is valid.
  const emailChangeHandler = (event) => {
    props.setEmailHasChanged(true);
    props.setNewEmail(event.target.value);
    setEnteredEmail(event.target.value);
    if (requestError) {
      setRequestError(null);
    }
    if (event.target.value.trim().length === 0) {
      setEmailValid(false);
      setEmailInputError("Please enter an email");
      props.setEmailValidity(false);
    } else if (!event.target.value.trim().includes("@")) {
      setEmailValid(false);
      setEmailInputError("Email must include an @");
      props.setEmailValidity(false);
    } else {
      setEmailValid(true);
      setEmailInputError(null);
      props.setEmailValidity(true);
    }
  };

  // When the email input is blurred...
  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  return (
    <Fragment>
      <input
        type="text"
        placeholder="email"
        name="email"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
        className={
          emailTouched && !emailValid
            ? "auth-input-container__input invalid "
            : "auth-input-container__input"
        }
      />
      {emailInputError && emailTouched && (
        <p className="error-message__email">{emailInputError}</p>
      )}
    </Fragment>
  );
};

export default EmailInput;
