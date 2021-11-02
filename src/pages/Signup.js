// Signup.js
// This component renders the signup form as it's own page.
// Implemented for React router purposes (in App.js).

import { Fragment } from "react";

import classes from "./Signup.module.css";

import SignupForm from "../components/Signup/SignupForm";

const SignUp = (props) => {
  return (
    <div className={classes["signup-form-main-content"]}>
      <h1>Sign Up</h1>
      <SignupForm finishSignup={props.finishSignup} />
    </div>
  );
};

export default SignUp;
