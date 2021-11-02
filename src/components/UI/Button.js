// Button.js
// A reusable button component

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes[props.class]} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
