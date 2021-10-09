import Button from "../UI/Button";

import classes from "./Login.module.css";

const Login = (props) => {
  const loginHandler = (event) => {
    event.preventDefault();
    props.onLogin();
  };

  return (
    <div className={classes["login-container"]}>
      <Button text="Login" class="login" onClick={loginHandler} />
      <Button text="Sign up" class="login" />
    </div>
  );
};

export default Login;
