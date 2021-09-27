import classes from "./Subnav.module.css";

const Subnav = (props) => {
  return (
    <div>
      <button className={classes["subnav-button"]}>{props.page}</button>
    </div>
  );
};

export default Subnav;
