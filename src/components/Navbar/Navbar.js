import Subnav from "./Subnav";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes["navbar-container"]}>
      <Subnav page="Home" />
      <Subnav page="Adoption Centers" />
      <Subnav page="Adoptable Pets" />
      <Subnav page="About" />
    </nav>
  );
};

export default Navbar;
