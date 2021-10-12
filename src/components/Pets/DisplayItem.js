import classes from "./DisplayItem.module.css";

const DisplayItem = (props) => {
  let photo = null;

  if (props.pictures.medium) {
    photo = props.pictures.medium;
  }

  return (
    <div className={classes["display-item"]}>
      <h3>{props.name}</h3>
      <div className={classes["image-container"]}>
        <img src={photo} alt={`A picture of ${props.name}`} />
      </div>
      <p>{`Age: ${props.age}`}</p>
      <p>{`Spayed/neutered: ${props.fixed}`}</p>
    </div>
  );
};

export default DisplayItem;
