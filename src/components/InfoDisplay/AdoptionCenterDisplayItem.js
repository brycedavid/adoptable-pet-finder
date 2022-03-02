// AdoptionCenterDisplayItem.js
// This component is rendered as a child to AdoptionCenterDisplay.js. It represents a display item (one display item per organization) that renders information about an organization,
// which was returned from the Petfinder API in AdoptionCenterDisplay.js.

import { useHistory } from "react-router";
import organizationPlaceholderImg from "../../shared/images/organization_placeholder.jpg";

const AdoptionCenterDisplayItem = (props) => {
  const history = useHistory();

  let photoElement = null;

  if (props.pictures.length !== 0) {
    photoElement = <img src={props.pictures[0].full} alt={`${props.name}`} />;
  } else {
    photoElement = (
      <img src={organizationPlaceholderImg} alt={`${props.name}`} />
    );
  }

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
