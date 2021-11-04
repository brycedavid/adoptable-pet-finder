import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.closeModal ? props.closeModal : null}
    />
  );
};

export default Backdrop;
