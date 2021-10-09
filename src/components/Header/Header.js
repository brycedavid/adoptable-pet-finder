import classes from "./Header.module.css";

import Login from "./Login";
import ProfilePicture from "./ProfilePicture";
import Title from "./Title";

const Header = (props) => {
  const loginHandler = () => {
    props.onLogin();
  };

  return (
    <header className={classes["header-container"]}>
      <Title />
      <div className={classes["profile-container"]}>
        <Login onLogin={loginHandler} />
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
