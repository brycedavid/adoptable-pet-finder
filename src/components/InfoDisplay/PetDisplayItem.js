// PetDisplayItem.js
// This component is rendered as a child to PetDisplay.js. It represents a display item (one display item per pet) that renders information about a pet,
// which was returned from the Petfinder API in PetDisplay.js.

import { useHistory } from "react-router";
import React, { useContext, useState } from "react";
import useFirebase from "../../hooks/useFirebase";

import AuthContext from "../../store/auth-context";
import { setFixed, isMixedBreed, truncatePetName, determinePetImage, determineRequestType } from "../../shared/utils/displayItemHelpers";

import rotateImg from "../../shared/images/rotate-img.svg";

const PetDisplayItem = (props) => {
  const [favorite, setFavorite] = useState(false);
  const [removeFavorite, setRemoveFavorite] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

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

  // Upon clicking a PetDisplayItem, flip the card
  const itemClickHandler = () => {
    let flipped = cardFlipped;
    setCardFlipped(!flipped);
  };

  // Navigate to the details page for the selected pet
  const viewDetailsHandler = (event) => {
    event.stopPropagation();

    history.push({ pathname: `/pets/${props.id}`, state: props });
  }

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

  // Here, we need to refactor the card flip to be on hover instead of on click

  return (
    <React.Fragment>
    <div className={`display-item--pet ${!props.skeleton ? "" : "shine"} ${cardFlipped ? "display-item__flipped" : ""}`} onClick={!props.skeleton ? itemClickHandler : null}>
      <div className="display-item__face">
        <div className="image-container--pet">{photoElement}</div>
        <h2 className="display-item__name">{petName}</h2>
        <img src={rotateImg} className="display-item-rotate-img" />
      </div>
      <div className="display-item__face display-item__face--back">
        <section className="display-item__info-container">
          <p className="item-info">{`${props.gender}, ${props.age}`}</p>
          <p className="item-info">{breed}</p>
          <p className="item-info">{props.size}</p>
          <p className="item-info">{isFixed}</p>
        </section>
        <section className="display-item__btn-container">
          <button className="btn--alt btn--display-item" onClick={viewDetailsHandler}>More Details</button>
          <button className={`btn--main btn--display-item ${!authCtx.isLoggedIn && "disabled"}`} onClick={setFavoriteHandler} title={!authCtx.isLoggedIn && "Login to set favorites!"}>Set as favorite</button>
        </section>
      </div>
    </div>
    </React.Fragment>
  );
};

export default PetDisplayItem;
