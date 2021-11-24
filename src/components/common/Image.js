// Image.js
// A configurable image component

import classes from "./Image.module.css";

const Image = (props) => {
  return (
    <img
      className={classes[`${props.class}`]}
      alt={props.altText}
      src={props.source}
    />
  );
};

export default Image;
