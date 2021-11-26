// Header.js
// This component is always rendered at the top of the application above the Navbar. It renders the Title and ProfilePicture components as children.
// It is responsible for initiating user logouts, logins, and signups through the associated buttons.

import ProfilePicture from "./ProfilePicture";
import Title from "./Title";

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
    <header className={"header-container"}>
      <Title />
      <div className={"profile-container"}>
        {!props.isAuthenticated && (
          <div className={"button-container"}>
            <button className="button-alt" onClick={loginHandler}>
              Login
            </button>
            <button className="button-alt" onClick={signupHandler}>
              Sign up
            </button>
          </div>
        )}
        {props.isAuthenticated && (
          <div className={"button-container"}>
            <button className="button-alt" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
