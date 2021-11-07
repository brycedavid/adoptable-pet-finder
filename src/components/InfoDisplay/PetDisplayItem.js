// PetDisplayItem.js
// This component is rendered as a child to PetDisplay.js. It represents a display item (one display item per pet) that renders information about a pet,
// which was returned from the Petfinder API in PetDisplay.js.

import classes from "./PetDisplayItem.module.css";
import dogPlaceholderImg from "../../images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../../images/cat-placeholder-tall.svg";

const PetDisplayItem = (props) => {
  let photoElement = null;
  let isFixed = null;

  // Check for a picture associated with the pet. If no picture, insert placeholder image based on pet type.
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

  // Upon clicking a PetDisplayItem, open the URL associated with the pet in a new window
  const itemClickHandler = () => {
    // Opens the URL to the pet information in a new window
    const newWindow = window.open(props.url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className="display-item" onClick={itemClickHandler}>
      <h2 className="display-item-name">{props.name}</h2>
      <div className={classes["image-container"]}>{photoElement}</div>
      <p>{`Age: ${props.age}`}</p>
      <p>{`Spayed/neutered: ${isFixed}`}</p>
    </div>
  );
};

export default PetDisplayItem;
