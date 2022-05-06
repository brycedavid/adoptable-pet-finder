// Subnav.js
// This component is a child component to Navbar.js and is rendered as navigation links.

import { NavLink } from "react-router-dom";

const Subnav = (props) => {
  const mobileMenuCollapseHandler = () => {
    console.log(props.checkboxRef);
    props.checkboxRef.current.checked = !props.checkboxRef.current.checked;
  };

  return (
    <li
      className={props.mobileVersion ? "subnav--mobile" : "subnav"}
      onClick={props.mobileVersion ? mobileMenuCollapseHandler : null}
    >
      <NavLink
        exact
        activeClassName="active"
        className={
          props.mobileVersion ? "subnav--mobile__link" : "subnav__link"
        }
        to={props.to}
      >
        {props.page}
      </NavLink>
    </li>
  );
};

export default Subnav;
