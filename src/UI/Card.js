import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes["main-image-container"]}>{props.children}</div>
  );
};

export default Card;
