// PetDisplayItem.js
// This component is rendered as a child to PetDisplay.js. It represents a display item (one display item per pet) that renders information about a pet,
// which was returned from the Petfinder API in PetDisplay.js.

import dogPlaceholderImg from "../../shared/images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../../shared/images/cat-placeholder-tall.svg";
import { useHistory } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";

import AuthContext from "../../store/auth-context";

const PetDisplayItem = (props) => {
  const [favorite, setFavorite] = useState(false);
  const [removeFavorite, setRemoveFavorite] = useState(false);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  console.log(props);

  let requestType;

  if (!favorite && !removeFavorite) {
    requestType = "getFavorites";
  } else if (removeFavorite && !favorite) {
    requestType = "removeFavorite";
  } else if (favorite) {
    requestType = "updateFavorites";
  } else {
    requestType = "";
  }

  if (localStorage.getItem("token") === null) {
    requestType = "";
  }

  console.log(requestType);

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

  if (!favorite && requestType !== "") {
    if (favoritePets) {
      for (let i = 0; i < favoritePets.length; i++) {
        if (favoritePets[i].id === props.id) {
          setFavorite(true);
        }
      }
    }
  }

  if (favorite && requestType === "removeFavorite") {
    setRemoveFavorite(false);
  }

  let photoElement = null;
  let isFixed = null;

  console.log(props.pictures);
  console.log(favorite);
  console.log(removeFavorite);

  // Check for a picture associated with the pet. If no picture, insert placeholder image based on pet type.
  if (props.pictures) {
    if (props.pictures.length !== 0) {
      photoElement = <img src={props.pictures[0].full} alt={`${props.name}`} />;
    } else if (props.pictures.length === 0 && props.type === "Dog") {
      photoElement = <img src={dogPlaceholderImg} alt={`${props.name}`} />;
    } else {
      photoElement = <img src={catPlaceholderImg} alt={`${props.name}`} />;
    }
  } else {
    if (props.type === "Dog") {
      photoElement = <img src={dogPlaceholderImg} alt={`${props.name}`} />;
    } else {
      photoElement = <img src={catPlaceholderImg} alt={`${props.name}`} />;
    }
  }

  if (props.fixed) {
    if (props.gender === "Male") {
      isFixed = "Neutered";
    } else {
      isFixed = "Spayed";
    }
  } else {
    if (props.gender === "Male") {
      isFixed = "Not Neutered";
    } else {
      isFixed = "Not Spayed";
    }
  }

  // If name is too long, slice to prevent content overflow
  let petName = props.name;

  if (petName.length > 40) {
    petName = petName.slice(0, 40);
    petName = petName.concat("...");
  }

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

  let activeState = "";
  let displayClass = "display-item--pet";
  let shine = "";
  let favoriteClass = "";

  if (favorite) {
    favoriteClass = "favorite";
  }

  if (props.skeleton) {
    shine = "shine";
  }

  return (
    <React.Fragment>
      <div
        className={`${displayClass} ${activeState} ${shine} `}
        onClick={!props.skeleton ? itemClickHandler : null}
      >
        <button
          onClick={setFavoriteHandler}
          className={`favorites-icon ${favoriteClass}`}
          title={favorite ? "Unfavorite" : "Add to favorites"}
        >
          &#9733;
        </button>

        <div className="image-container--pet">{photoElement}</div>
        <h2 className="display-item__name">{petName}</h2>
        <p>{`${props.gender}, ${props.age}`}</p>
        <p>{props.breed}</p>
        <p>{`Size: ${props.size}`}</p>
        <p>{isFixed}</p>
      </div>
    </React.Fragment>
  );
};

export default PetDisplayItem;
