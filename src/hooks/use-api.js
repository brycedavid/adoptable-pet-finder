// use-api.js
// This component is implemented as a custom hook, which is called to perform API requests
// related to pet information from the Petfinder API. Configured to be re-usable for any search
// using the props parameter.

import { useState, useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

// Our client object, which is required to make API requests to the Petfinder API
const petFinderClient = new Client({
  apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
  secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
});

// Check current state if data has changed to prevent re-renders; Redux?

const useApi = (props) => {
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // Destruct props to extract values
  let {
    limit,
    sendRequest: propSendRequest,
    searchType,
    displayAmount,
    filter: propFilter,
  } = props;

  let parsedValues = {};
  if (propFilter) {
    let { type, breed, gender, age, zip } = propFilter;
    let valueArray = [
      "type",
      type,
      "breed",
      breed,
      "gender",
      gender,
      "age",
      age,
      "zip",
      zip,
    ];

    for (let i = 1; i < valueArray.length; i += 2) {
      if (valueArray[i] !== "any") {
        parsedValues[valueArray[i - 1]] = valueArray[i];
      }
    }
  }

  console.log("Search Type: " + searchType);
  console.log("Send Request: " + propSendRequest);

  if (!searchType) {
    console.log("Setting search type...");
    searchType = "pets";
  }

  useEffect(() => {
    // This async method makes our API request and parses it into an iterable array, which
    // is returned to whatever uses this hook. If props.sendRequest is false, do not
    // make a request.
    const makeRequest = async () => {
      let responseData = null;
      let dataArray = [];

      console.log("Requesting data...");
      console.log("Filter used for request: ");
      console.log(parsedValues);

      if (requestError) {
        console.log("API request failed.... retrying...");
      }

      // Decide which type of request to make based on props.searchType
      switch (searchType) {
        case "pets":
          if (propFilter) {
            console.log("filtered request");
            responseData = await petFinderClient.animal
              .search({ limit, ...parsedValues })
              .catch((error) => {
                console.log(error);
                setRequestError(error);
              });
          } else {
            console.log("Non-filtered request");
            responseData = await petFinderClient.animal
              .search({ limit })
              .catch((error) => {
                console.log(error);
                setRequestError(error);
              });
          }

          // if data is returned from request, parse and store into dataArray
          if (responseData && !requestError) {
            for (let animal of responseData.data.animals) {
              dataArray.push({
                key: animal.id,
                id: animal.id,
                name: animal.name,
                age: animal.age,
                fixed: animal.attributes.spayed_neutered,
                pictures: animal.photos,
                url: animal.url,
                type: animal.type,
              });
            }
          }
          break;

        case "organizations":
          // Request organization data
          responseData = await petFinderClient.organization
            .search({
              limit,
            })
            .catch((error) => {
              console.log(error);
              setRequestError(error);
            });

          // if data is returned from request, parse and store into dataArray
          if (responseData && !requestError) {
            for (let organization of responseData.data.organizations) {
              dataArray.push({
                email: organization.email,
                key: organization.id,
                id: organization.id,
                phone: organization.phone,
                pictures: organization.photos,
                address: organization.address,
                name: organization.name,
                url: organization.url,
              });
            }
          }
          break;

        default:
          responseData = null;
          break;
      }

      // Log our data (for development purposes) and set our data state.
      console.log(responseData);
      console.log(dataArray);
      console.log("Setting data..");
      setData(dataArray.slice(0, displayAmount));
    };

    // If props.sendRequest is true, call makeRequest.
    // otherwise, do nothing.
    if (propSendRequest) {
      console.log("Calling makeRequest...");
      makeRequest();
    }

    // useEffect cleanup
    return () => {
      setData(null);
    };
  }, [
    propSendRequest,
    displayAmount,
    limit,
    searchType,
    propFilter,
    requestError,
    props.filter,
  ]);

  return data;
};
export default useApi;
