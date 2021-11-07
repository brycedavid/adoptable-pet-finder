// use-api.js
// This component is implemented as a custom hook, which is called to perform API requests
// related to pet information from the Petfinder API. Configured to be re-usable for any search
// using the searchOptions parameter.

import { useState, useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

// Our client object, which is required to make API requests to the Petfinder API
const petFinderClient = new Client({
  apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
  secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
});

// Check current state if data has changed to prevent re-renders; Redux?

const useApi = (searchOptions) => {
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // Destruct searchOptions to extract values
  let { searchType, limit, type, sendRequest, displayAmount } = searchOptions;

  useEffect(() => {
    // This async method makes our API request and parses it into an iterable array, which
    // is returned to whatever uses this hook. If searchOptions.sendRequest is false, do not
    // make a request.
    const makeRequest = async () => {
      let responseData = null;
      let dataArray = [];

      console.log("Requesting data...");

      if (requestError) {
        console.log("API request failed.... retrying...");
      }

      // Decide which type of request to make based on searchOptions.searchType
      switch (searchType) {
        case "pets":
          // Request pet data
          responseData = await petFinderClient.animal
            .search({
              type,
              limit,
            })
            .catch((error) => {
              console.log(error);
              setRequestError(error);
            });

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
      setData(dataArray.slice(0, displayAmount));
    };

    // If searchOptions.sendRequest is true, call makeRequest.
    // otherwise, do nothing.
    if (sendRequest) {
      makeRequest();
    }

    // useEffect cleanup
    return () => {
      // cancel request
    };
  }, [sendRequest, displayAmount, limit, type, searchType, requestError]);

  return data;
};
export default useApi;
