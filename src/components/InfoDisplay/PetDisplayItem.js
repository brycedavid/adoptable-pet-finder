// PetDisplayItem.js
// This component is rendered as a child to PetDisplay.js. It represents a display item (one display item per pet) that renders information about a pet,
// which was returned from the Petfinder API in PetDisplay.js.

import { useHistory } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";

import AuthContext from "../../store/auth-context";
import { setFixed, isMixedBreed, truncatePetName, determinePetImage, determineRequestType } from "../../shared/utils/displayItemHelpers";

const PetDisplayItem = (props) => {
  const [favorite, setFavorite] = useState(false);
  const [removeFavorite, setRemoveFavorite] = useState(false);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  let requestType = determineRequestType(favorite, removeFavorite);

  if (localStorage.getItem("token") === null) {
    requestType = "";
  }

  let favoritePets = useFirebase(requestType, [
    {
      id: props.id,
      name: props.name,
      age: props.age,
      fixed: props.fixed,
      pictures: props.pictures,
      url: props.url,
      type: props.type,
      breed: props.breed,
      size: props.size,
      gender: props.gender,
      address: props.address,
      index: -2,
    },
  ]);

  if (!favorite && requestType !== "" && favoritePets) {
    for (let i = 0; i < favoritePets.length; i++) {
      if (favoritePets[i].id === props.id) {
        setFavorite(true);
      }
    }
  }

  if (favorite && requestType === "removeFavorite") {
    setRemoveFavorite(false);
  }

  let photoElement = determinePetImage(props.pictures, props.name, props.type);

  let isFixed = setFixed(props.fixed, props.gender);

  let breed = props.breed;

  if(props.filteredBreed !== "any"){
    breed = isMixedBreed(props.breed, props.filteredBreed);
  }

  let petName = truncatePetName(props.name);

  // Upon clicking a PetDisplayItem, open the URL associated with the pet in a new window
  const itemClickHandler = () => {
    history.push({ pathname: `/pets/${props.id}`, state: props });
  };

  const setFavoriteHandler = (event) => {
    event.stopPropagation();

    if (authCtx.isLoggedIn) {
      if (favorite === false) {
        setFavorite(true);
      } else {
        setFavorite(false);
        setRemoveFavorite(true);
      }
    } else {
      alert(
        "Must be logged in to add to favorites; either log in if you already have an account or create one"
      );
    }
  };

  return (
    <React.Fragment>
      <div
        className={`display-item--pet ${!props.skeleton ? "" : "shine"}`}
        onClick={!props.skeleton ? itemClickHandler : null}
      >
        <button
          onClick={setFavoriteHandler}
          className={`favorites-icon ${!favorite ? "" : "favorite"}`}
          title={favorite ? "Unfavorite" : "Add to favorites"}
        >
          &#9733;
        </button>

        <div className="image-container--pet">{photoElement}</div>
        <h2 className="display-item__name">{petName}</h2>
        <p>{`${props.gender}, ${props.age}`}</p>
        <p>{breed}</p>
        <p>{`Size: ${props.size}`}</p>
        <p>{isFixed}</p>
      </div>
    </React.Fragment>
  );
};

export default PetDisplayItem;
