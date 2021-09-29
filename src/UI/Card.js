import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes[`${props.class}`]}>{props.children}</div>;
};

export default Card;
