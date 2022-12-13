// AdoptionCenterDisplayItem.js
// This component is rendered as a child to AdoptionCenterDisplay.js. It represents a display item (one display item per organization) that renders information about an organization,
// which was returned from the Petfinder API in AdoptionCenterDisplay.js.

import React, {useState} from "react";
import { useHistory } from "react-router";
import { determineOrgImage } from "../../shared/utils/displayItemHelpers";

const AdoptionCenterDisplayItem = (props) => {
  const [cardFlipped, setCardFlipped] = useState(false);

  const history = useHistory();

  let photoElement = determineOrgImage(props.pictures, props.name);

  const itemClickHandler = () => {
    let flipped = cardFlipped;
    setCardFlipped(!flipped);
  };

  // Navigate to the details page for the selected pet
  const viewDetailsHandler = (event) => {
    event.stopPropagation();
  
    history.push({ pathname: `/pets/${props.id}`, state: props });
  }

  return (
    <div
      className={
        props.skeleton ? "display-item--org shine" : "display-item--org"
      }
      onClick={!props.skeleton ? itemClickHandler : null}
    >
      <div className="display-item__face">
      <h2 className="display-item__name">{props.name}</h2>
      <section className="display-item--org__content">
        <div className="image-container--org">{photoElement}</div>
      </section>
      </div>
      <div className="display-item__face display-item__face--back">
        <section className="info-container">
          <section className="info-container__address">
            {<p>{props.address.address1}</p>}
            <p>{`${props.address.city}, ${props.address.state} ${props.address.postcode}`}</p>
          </section>
          <p>{props.phone}</p>
          <p>{props.email}</p>
          <section className="display-item__btn-container">
            <button className="btn--alt btn--large" onClick={viewDetailsHandler}>More Details</button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default AdoptionCenterDisplayItem;
