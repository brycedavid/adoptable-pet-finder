// Subnav.js
// This component is a child component to Navbar.js and is rendered as navigation links.

import { NavLink } from "react-router-dom";

const Subnav = (props) => {
  return (
    <li className="subnav">
      <NavLink
        exact
        activeClassName="active"
        className="subnav__link"
        to={props.to}
      >
        {props.page}
      </NavLink>
    </li>
  );
};

export default Subnav;
