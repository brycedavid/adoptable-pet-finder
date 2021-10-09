import classes from "./Button.module.css";

const Button = (props) => {
  return <button className={classes[props.class]}>{props.text}</button>;
};

export default Button;