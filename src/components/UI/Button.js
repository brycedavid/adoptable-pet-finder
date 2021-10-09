import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes[props.class]}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
