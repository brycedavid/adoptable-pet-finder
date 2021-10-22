import classes from "./Header.module.css";

import ProfilePicture from "./ProfilePicture";
import Title from "./Title";
import Button from "../UI/Button";

const Header = (props) => {
  const loginHandler = () => {
    props.onLogin();
  };

  const logoutHandler = () => {
    props.onLogout();
  };

  const signupHandler = () => {
    props.onSignup();
  };

  return (
    <header className={classes["header-container"]}>
      <Title />

      <div className={classes["profile-container"]}>
        {!props.isAuthenticated && (
          <div className={classes["login-container"]}>
            <Button text="Login" class="login" onClick={loginHandler} />
            <Button text="Sign up" class="login" onClick={signupHandler} />
          </div>
        )}
        {props.isAuthenticated && (
          <div className={classes["login-container"]}>
            <Button text="Logout" class="login" onClick={logoutHandler} />
          </div>
        )}
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
