// Card.js
// A reusable card component, which acts as a configurable container to display information.

import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes[`${props.class}`]}>{props.children}</div>;
};

export default Card;
