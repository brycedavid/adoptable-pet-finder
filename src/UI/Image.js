import classes from "./Image.module.css";

const Image = (props) => {
  return (
    <img
      className={classes["main-image"]}
      alt={props.altText}
      src={props.source}
    />
  );
};

export default Image;
