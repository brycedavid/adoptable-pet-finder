// Header.js
// This component is always rendered at the top of the application above the Navbar. It renders the Title and ProfilePicture components as children.
// It is responsible for initiating user logouts, logins, and signups through the associated buttons.

import classes from "./Header.module.css";

import ProfilePicture from "./ProfilePicture";
import Title from "./Title";
import Button from "../common/Button";

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
          <div className={classes["button-container"]}>
            <Button text="Login" class="button-alt" onClick={loginHandler} />
            <Button text="Sign up" class="button-alt" onClick={signupHandler} />
          </div>
        )}
        {props.isAuthenticated && (
          <div className={classes["button-container"]}>
            <Button text="Logout" class="button-alt" onClick={logoutHandler} />
          </div>
        )}
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
