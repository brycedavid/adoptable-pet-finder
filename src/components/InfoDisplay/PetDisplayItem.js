// PetDisplayItem.js
// This component is rendered as a child to PetDisplay.js. It represents a display item (one display item per pet) that renders information about a pet,
// which was returned from the Petfinder API in PetDisplay.js.

import dogPlaceholderImg from "../../shared/images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../../shared/images/cat-placeholder-tall.svg";

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
    if (props.gender === "Male") {
      isFixed = "Neutered";
    } else {
      isFixed = "Spayed";
    }
  } else {
    if (props.gender === "Male") {
      isFixed = "Not Neutered";
    } else {
      isFixed = "Not Spayed";
    }
  }

  // Upon clicking a PetDisplayItem, open the URL associated with the pet in a new window
  const itemClickHandler = () => {
    // Opens the URL to the pet information in a new window
    const newWindow = window.open(props.url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  let activeState = "";
  let displayClass = "display-item";
  let shine = "";

  // if (props.index < 0) {
  //   displayClass = "display-item";
  // } else {
  //   displayClass = "display-item-carousel";
  //   if (props.index === props.activeIndex) {
  //     activeState = "carousel-active";
  //   } else {
  //     activeState = "carousel-inactive";
  //   }
  // }

  if (props.skeleton) {
    shine = "shine";
  }

  return (
    <div
      className={`${displayClass} ${activeState} ${shine} `}
      onClick={!props.skeleton ? itemClickHandler : null}
    >
      <div className="image-container-pet">{photoElement}</div>
      <h2 className="display-item-name">{props.name}</h2>
      <p>{`${props.gender}, ${props.age}`}</p>
      <p>{props.breed}</p>
      <p>{props.location}</p>
      <p>{`Size: ${props.size}`}</p>
      <p>{isFixed}</p>
    </div>
  );
};

export default PetDisplayItem;
