// Signup.js
// This component renders the signup form as it's own page.
// Implemented for React router purposes (in App.js).

import SignupForm from "../components/Signup/SignupForm";

const SignUp = (props) => {
  return <SignupForm finishSignup={props.finishSignup} />;
};

export default SignUp;
