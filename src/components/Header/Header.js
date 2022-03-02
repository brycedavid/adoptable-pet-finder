// Header.js
// This component is always rendered at the top of the application above the Navbar. It renders the Title and ProfilePicture components as children.
// It is responsible for initiating user logouts, logins, and signups through the associated buttons.

import { useHistory } from "react-router";
import ProfilePicture from "./ProfilePicture";

const Header = (props) => {
  const history = useHistory();

  const loginHandler = () => {
    props.onLogin();
  };

  const logoutHandler = () => {
    props.onLogout();
  };

  const signupHandler = () => {
    props.onSignup();
  };

  const goToFavoritesHandler = () => {
    history.push("/favorite-pets");
  };

  return (
    <header className="header">
      <div className="header__title-container">
        <h2 className="welcome-text">Welcome to:</h2>
        <h1 className="heading--medium">
          <b>Adoptable Pet Finder</b>
        </h1>
        <h2 className="heading--small">
          Locate Pets & Adoption Centers Near You!
        </h2>
      </div>
      <div className="header__profile-container">
        {!props.isAuthenticated && (
          <div className="header__btn-container">
            <button className="btn--alt" onClick={loginHandler}>
              Login
            </button>
            <button className="btn--alt" onClick={signupHandler}>
              Sign up
            </button>
          </div>
        )}
        {props.isAuthenticated && (
          <div className="header__btn-container">
            <button className="btn--alt" onClick={logoutHandler}>
              Logout
            </button>
            <button className="btn--alt" onClick={goToFavoritesHandler}>
              Favorites
            </button>
          </div>
        )}
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
