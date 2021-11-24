// AdoptionCenterDisplayItem.js
// This component is rendered as a child to AdoptionCenterDisplay.js. It represents a display item (one display item per organization) that renders information about an organization,
// which was returned from the Petfinder API in AdoptionCenterDisplay.js.

import organizationPlaceholderImg from "../../shared/images/organization_placeholder.jpg";

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
    <div className="display-item-organization" onClick={itemClickHandler}>
      <h2 className="display-item-name-organization">{props.name}</h2>
      <section className="display-item-organization-content">
        <div className="image-container">{photoElement}</div>
        <section className="info-container">
          <section className="info-container-address">
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
