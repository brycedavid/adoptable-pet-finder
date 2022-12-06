import dogPlaceholderImg from "../images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../images/cat-placeholder-tall.svg";

import isEqual from "react-fast-compare";

export const determineRequestType = (favorite, removeFavorite) => {
  let requestType = null;

  if (!favorite && !removeFavorite) {
    requestType = "getFavorites";
  } else if (removeFavorite && !favorite) {
    requestType = "removeFavorite";
  } else if (favorite) {
    requestType = "updateFavorites";
  } else {
    requestType = "";
  }

  return requestType;
}

export const setFixed = (fixed, gender) => {
  let isFixed = null;

  if (fixed) {
    if (gender === "Male") {
      isFixed = "Neutered";
    } else {
      isFixed = "Spayed";
    }
  } else {
    if (gender === "Male") {
      isFixed = "Not Neutered";
    } else {
      isFixed = "Not Spayed";
    }
  }

  return isFixed;
}

export const isMixedBreed = (breed, filteredBreed) => {
  if (!isEqual(breed, filteredBreed)) {
    return "Mixed";
  } else {
    return breed;
  }
}

export const truncatePetName = (petName) => {
  let newPetName = null;

  if (petName.length > 46) {
    newPetName = petName.slice(0, 46);
    newPetName = newPetName.concat("...");
    return newPetName;
  } else {
    return petName;
  }
}

export const determinePetImage = (pictures, name, type) => {
  let photoElement = null;

  if (pictures) {
    if (pictures.length !== 0) {
      photoElement = <img src={pictures[0].full} alt={`${name}`} />;
    } else if (pictures.length === 0 && type === "Dog") {
      photoElement = <img src={dogPlaceholderImg} alt={`${name}`} />;
    } else {
      photoElement = <img src={catPlaceholderImg} alt={`${name}`} />;
    }
  } else {
    if (type === "Dog") {
      photoElement = <img src={dogPlaceholderImg} alt={`${name}`} />;
    } else {
      photoElement = <img src={catPlaceholderImg} alt={`${name}`} />;
    }
  }

  return photoElement;
}