import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

// Once LoginForm validation is completed, implement here

const SignupForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest();
  };

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

    if (!response.ok) {
      alert("Something went wrong...failed to signup.");
      // throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    authCtx.login(responseData.idToken);
    props.finishSignup();
  };

  return (
    <form onSubmit={submitHandler}>
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
