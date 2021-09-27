import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <h1 className={classes["welcome-text"]}>Welcome to:</h1>
      <h1>Adoptable Pet Finder</h1>
      <h2>Locate Pet Adoption Centers Near You!</h2>
    </header>
  );
};

export default Header;
