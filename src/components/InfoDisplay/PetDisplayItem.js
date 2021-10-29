import classes from "./PetDisplayItem.module.css";
import dogPlaceholderImg from "../../images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../../images/cat-placeholder-tall.svg";

const PetDisplayItem = (props) => {
  let photoElement = null;
  let isFixed = null;

  if (props.pictures.length !== 0) {
    photoElement = <img src={props.pictures[0].full} alt={`${props.name}`} />;
  } else if (props.pictures.length === 0 && props.type === "Dog") {
    photoElement = <img src={dogPlaceholderImg} alt={`${props.name}`} />;
  } else {
    photoElement = <img src={catPlaceholderImg} alt={`${props.name}`} />;
  }

  if (props.fixed) {
    isFixed = "Yes";
  } else {
    isFixed = "No";
  }

  const itemClickHandler = () => {
    // Opens the URL to the pet information in a new window
    const newWindow = window.open(props.url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className={classes["display-item"]} onClick={itemClickHandler}>
      <h3>{props.name}</h3>
      <div className={classes["image-container"]}>{photoElement}</div>
      <p>{`Age: ${props.age}`}</p>
      <p>{`Spayed/neutered: ${isFixed}`}</p>
    </div>
  );
};

export default PetDisplayItem;
