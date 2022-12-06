import isEqual from "react-fast-compare";

export const determineSendRequest = (requestError, resultsFilter, petRequestSent, featuredPets, homeRequestSent) => {
  let sendRequest = true;  
  
  // If there was a problem with a previous data request, don't send another
  if (requestError) {
    sendRequest = false;
  }
  
  // If our filter equals default filter and we've already requested pets, don't send request
  if (
    isEqual(resultsFilter, {
      type: "any",
      breed: "any",
      gender: "any",
      age: "any",
      location: "any",
    }) &&
    petRequestSent &&
    !featuredPets
  ) {
    sendRequest = false;
  }

  // If display belongs to hompeage and we have already requested for homepage pet data, don't send request
  if (featuredPets && homeRequestSent) {
    sendRequest = false;
  }

  return sendRequest;
}

export const determineShowButton = (data, featuredPets) => {
  let showButton = true;

  if (data.length <= 12) {
    showButton = false;
  }
  if (featuredPets) {
    showButton = false;
  }

  return showButton;
}