import React from "react";
import { useHistory } from "react-router-dom";

import PetDisplayItem from "./PetDisplayItem";

const PetDisplayItemContainer = (props) => {
  const history = useHistory();

  return (
    <div
      className={
        props.parsedData.data.length > 0
          ? "pet-display-item-container"
          : "no-data-message-container"
      }
    >
      <div
        className={
          props.parsedData.data.length > 0
            ? !props.featuredPets
              ? "pet-display-container__content"
              : "pet-display-container--featured__content"
            : "no-data-message-container__message"
        }
      >
        {props.parsedData.data.length > 0 ? (
          props.parsedData.data
            .slice(0, props.parsedData.itemsToShow)
            .map((animal) => (
              <PetDisplayItem
                key={animal.key}
                id={animal.id}
                name={animal.name}
                age={animal.age}
                fixed={animal.fixed}
                pictures={animal.pictures}
                url={animal.url}
                type={animal.type}
                breed={animal.breed}
                filteredBreed={props.resultsFilter.breed}
                size={animal.size}
                gender={animal.gender}
                address={animal.address}
                index={-2}
              />
            ))
        ) : (
          <p>No pets found.</p>
        )}
      </div>
      <div className="btn-container-bottom">
        {props.parsedData.showButton && (
          <button
            className="btn--alt btn--large"
            onClick={props.showMoreHandler}
          >
            Show More Pets
          </button>
        )}
        {history.location.pathname === "/adoptable-pets" && (
          <button
            className="btn--main btn--large"
            onClick={props.browseOrganizationsHandler}
          >
            Browse Adoption Centers
          </button>
        )}
      </div>
    </div>
  );
};

export default PetDisplayItemContainer;
