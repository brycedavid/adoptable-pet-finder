import classes from "./Header.module.css";

import Login from "./Login";
import ProfilePicture from "./ProfilePicture";
import Title from "./Title";

const Header = (props) => {
  return (
    <header className={classes["header-container"]}>
      <Title />
      <div className={classes["profile-container"]}>
        <Login />
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
