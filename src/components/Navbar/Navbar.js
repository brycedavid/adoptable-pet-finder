import classes from "./Navbar.module.css";

import Subnav from "./Subnav";

const Navbar = () => {
  return (
    <nav className={classes["navbar"]}>
      <ul>
        <Subnav page="Home" to="/home" />
        <Subnav page="Adoption Centers" to="/adoption-centers" />
        <Subnav page="Adoptable Pets" to="/adoptable-pets" />
        <Subnav page="About" to="/about" />
      </ul>
    </nav>
  );
};

export default Navbar;
