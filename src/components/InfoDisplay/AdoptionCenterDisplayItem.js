// AdoptionCenterDisplayItem.js
// This component is rendered as a child to AdoptionCenterDisplay.js. It represents a display item (one display item per organization) that renders information about an organization,
// which was returned from the Petfinder API in AdoptionCenterDisplay.js.

import { useHistory } from "react-router";
import { determineOrgImage } from "../../shared/utils/displayItemHelpers";

const AdoptionCenterDisplayItem = (props) => {
  const history = useHistory();

  let photoElement = determineOrgImage(props.pictures, props.name);

  const itemClickHandler = () => {
    history.push({ pathname: `/organizations/${props.id}`, state: props });
  };

  return (
    <div
      className={
        props.skeleton ? "display-item--org shine" : "display-item--org"
      }
      onClick={!props.skeleton ? itemClickHandler : null}
    >
      <h2 className="display-item__name">{props.name}</h2>
      <section className="display-item--org__content">
        <div className="image-container--org">{photoElement}</div>
        <section className="info-container">
          <section className="info-container__address">
            {<p>{props.address.address1}</p>}
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
