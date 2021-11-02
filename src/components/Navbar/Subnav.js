// Subnav.js
// This component is a child component to Navbar.js and is rendered as navigation links.

import { NavLink } from "react-router-dom";

import classes from "./Subnav.module.css";

const Subnav = (props) => {
  return (
    <li className={classes.subnav}>
      <NavLink
        activeClassName={classes.active}
        className={classes["subnav"]}
        to={props.to}
      >
        {props.page}
      </NavLink>
    </li>
  );
};

export default Subnav;
