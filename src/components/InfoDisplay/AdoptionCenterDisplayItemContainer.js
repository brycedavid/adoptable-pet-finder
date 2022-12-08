import React from "react";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";

const AdoptionCenterDisplayItemContainer = (props) => {
  return(
    <div
        className={
          props.parsedData.data.length > 0
            ? "org-display-item-container"
            : "no-data-message-container--org"
        }
      >
        <div
          className={
            props.parsedData.data.length > 0
              ? "org-display-container__content"
              : "no-data-message-container--org__message"
          }
        >
          {props.parsedData.data.length > 0 ? (
            props.parsedData.data
              .slice(0, props.parsedData.itemsToShow)
              .map((organization) => (
                <AdoptionCenterDisplayItem
                  email={organization.email}
                  key={organization.key}
                  id={organization.id}
                  address={organization.address}
                  name={organization.name}
                  phone={organization.phone}
                  pictures={organization.pictures}
                  url={organization.url}
                />
              ))
          ) : (
            <p>No adoption centers found.</p>
          )}
        </div>
        <div className="btn-container-bottom">
          {props.parsedData.showButton && (
            <button className="btn--alt btn--large" onClick={props.showMoreHandler}>
              Show More
            </button>
          )}
          <button className="btn--main btn--large" onClick={props.browsePetsHandler}>
            Browse Adoptable Pets
          </button>
        </div>
      </div>
  );
}

export default AdoptionCenterDisplayItemContainer;