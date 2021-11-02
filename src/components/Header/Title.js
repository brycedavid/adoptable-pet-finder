// Title.js
// This component is rendered as a child to Header.js and includes the title of the website.

import classes from "./Title.module.css";

const Title = () => {
  return (
    <div className={classes["title-container"]}>
      <h1 className={classes["welcome-text"]}>Welcome to:</h1>
      <h1>Adoptable Pet Finder</h1>
      <h2>Locate Pet Adoption Centers Near You!</h2>
    </div>
  );
};

export default Title;
