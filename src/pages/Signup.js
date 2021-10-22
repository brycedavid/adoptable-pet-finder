import SignupForm from "../components/Signup/SignupForm";

const SignUp = (props) => {
  return <SignupForm finishSignup={props.finishSignup} />;
};

export default SignUp;
