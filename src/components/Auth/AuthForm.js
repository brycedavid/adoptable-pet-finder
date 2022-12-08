// AuthForm.js
import { useContext, useState } from "react";
import { useHistory } from "react-router";

import AuthContext from "../../store/auth-context";
import LoadingIndicator from "../common/LoadingIndicator";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

const AuthForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [requestError, setRequestError] = useState(null);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  let formIsValid = false;

  // Sends API request for login
  const sendRequest = async () => {
    setIsLoading(true);

    await fetch(
      props.type === "login" ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCT7FuvqHq8fPhrdZHpdqEUL87GJ7TpC_Q" : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCT7FuvqHq8fPhrdZHpdqEUL87GJ7TpC_Q",
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
    )
      .then(async (response) => {
        // Convert response to json
        const responseData = await response.json();

        if(!response.ok) {
          switch (responseData.error.message) {
            case "EMAIL_EXISTS":
              throw new Error("The email you are attempting to use is already in use by another account.");
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              throw new Error("Too many signup attempts... try again later");
            case "INVALID_EMAIL":
              throw new Error("There is no account corresponding to the entered email; Try another email.");
            case "EMAIL_NOT_FOUND":
              throw new Error("There is no account corresponding to the entered email; Try another email.");
            case "INVALID_PASSWORD":
              throw new Error("The entered password is invalid.");
            case "USER_DISABLED":
              throw new Error("This user account has been disabled by an administrator");
            default:
              if (props.type === "login"){
                throw new Error("Something went wrong... failed to login.");
              } else if (props.type === "signup") {
                throw new Error("Something went wrong... failed to signup");
              }
          }
        }

        setIsLoading(false);
        authCtx.login(responseData.localId);
        props.onSubmit();
        history.push("/");
      })
      .catch((error) => {
        setRequestError(error.message);
        console.log(error);
        setIsLoading(false);
      });
  };

  // If the email and password inputs have been changed and their values
  // are valid, the form is valid.
  if (emailValid && passwordValid && emailChanged && passwordChanged) {
    formIsValid = true;
  }

  const setEmailValidity = (isValid) => {
    setEmailValid(isValid);
  }

  const setPasswordValidity = (isValid) => {
    setPasswordValid(isValid);
  }

  const setEmailHasChanged = (hasChanged) => {
    setEmailChanged(hasChanged);
  }

  const setPasswordHasChanged = (hasChanged) => {
    setPasswordChanged(hasChanged);
  }

  const setNewEmail = (email) => {
    setEnteredEmail(email);
  }

  const setNewPassword = (pass) => {
    setEnteredPassword(pass);
  }

  // Upon login, send API request
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    sendRequest();
  };

  return (
    <div className="auth-form-container">
      {requestError && <p className="error-message__general">{requestError}</p>}
      <form onSubmit={submitHandler} className="auth-form-container__form">
        <h2 className="heading--medium">
          <b>Login</b>
        </h2>
        <section className="auth-input-container">
          <EmailInput setEmailValidity={setEmailValidity} setEmailHasChanged={setEmailHasChanged} setNewEmail={setNewEmail} />
          <PasswordInput setPasswordValidity={setPasswordValidity} setPasswordHasChanged={setPasswordHasChanged} setNewPassword={setNewPassword} />
        </section>
        {isLoading && <LoadingIndicator />}
        {!isLoading && (
          <button
            disabled={!formIsValid}
            className={formIsValid ? "btn--main" : "btn--main disabled"}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
