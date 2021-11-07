// AdoptionCenterDisplayItem.js
// This component is rendered as a child to AdoptionCenterDisplay.js. It represents a display item (one display item per organization) that renders information about an organization,
// which was returned from the Petfinder API in AdoptionCenterDisplay.js.

import classes from "./AdoptionCenterDisplayItem.module.css";

import organizationPlaceholderImg from "../../images/organization_placeholder.jpg";

const AdoptionCenterDisplayItem = (props) => {
  let photoElement = null;

  if (props.pictures.length !== 0) {
    photoElement = <img src={props.pictures[0].full} alt={`${props.name}`} />;
  } else {
    photoElement = (
      <img src={organizationPlaceholderImg} alt={`${props.name}`} />
    );
  }

  // Upon clicking a AdoptionCenterDisplayItem, open the URL associated with the organization in a new window
  const itemClickHandler = () => {
    // Opens the URL to the organization information in a new window
    const newWindow = window.open(props.url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div
      className="display-item organization-display-item"
      onClick={itemClickHandler}
    >
      <h2 className="display-item-name organization-item-name">{props.name}</h2>
      <section className={classes["display-content"]}>
        <div className={classes["image-container"]}>{photoElement}</div>
        <section className={classes["info-container"]}>
          <section className={classes["address-container"]}>
            <p>{props.address.address1}</p>
            <p>{`${props.address.city}, ${props.address.state} ${props.address.postcode}`}</p>
          </section>
          <p>{props.phone}</p>
          <p>{props.email}</p>
        </section>
      </section>
    </div>
  );
};

export default AdoptionCenterDisplayItem;
