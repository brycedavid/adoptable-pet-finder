// AdoptionCenterDisplayItem.js
// This component is rendered as a child to AdoptionCenterDisplay.js. It represents a display item (one display item per organization) that renders information about an organization,
// which was returned from the Petfinder API in AdoptionCenterDisplay.js.

import classes from "./AdoptionCenterDisplayItem.module.css";

const AdoptionCenterDisplayItem = (props) => {
  // Upon clicking a AdoptionCenterDisplayItem, open the URL associated with the organization in a new window
  const itemClickHandler = () => {
    // Opens the URL to the organization information in a new window
    const newWindow = window.open(props.url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className={classes["display-item"]} onClick={itemClickHandler}>
      <h3>{props.name}</h3>
      <p>{props.phone}</p>
      <p>{props.address.address1}</p>
      <p>{`${props.address.city}, ${props.address.state} ${props.address.postcode}`}</p>
    </div>
  );
};

export default AdoptionCenterDisplayItem;
