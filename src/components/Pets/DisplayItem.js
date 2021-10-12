import classes from "./DisplayItem.module.css";

const DisplayItem = (props) => {
  let photoElement = null;
  let isFixed = null;

  if (props.pictures.length != 0) {
    photoElement = (
      <img src={props.pictures[0].full} alt={`A picture of ${props.name}`} />
    );
  } else {
    photoElement = <img alt={`A picture of ${props.name}`} />;
  }

  if (props.fixed) {
    isFixed = "Yes";
  } else {
    isFixed = "No";
  }

  return (
    <div className={classes["display-item"]}>
      <h3>{props.name}</h3>
      <div className={classes["image-container"]}>{photoElement}</div>
      <p>{`Age: ${props.age}`}</p>
      <p>{`Spayed/neutered: ${isFixed}`}</p>
    </div>
  );
};

export default DisplayItem;
