import Button from "../UI/Button";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes["login-container"]}>
      <Button text="Login" class="login" />
      <Button text="Sign up" class="login" />
    </div>
  );
};

export default Login;