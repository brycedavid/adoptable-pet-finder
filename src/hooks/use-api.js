// use-api.js
// This component is implemented as a custom hook, which is called to perform API requests
// related to pet information from the Petfinder API. Configured to be re-usable for any search
// using the props parameter.

import { useState, useEffect, useRef } from "react";

import { Client } from "@petfinder/petfinder-js";

import isEqual from "react-fast-compare";

import {
  parseOrganizationData,
  parsePetData,
  prepPetFilter,
} from "../shared/utils/parseData";
import { apiKey, secret } from "../shared/constants";

// Our client object, which is required to make API requests to the Petfinder API
const petFinderClient = new Client({
  apiKey: apiKey,
  secret,
});

// Controls how many times a request is retried
let numRequestRetries = 0;

// Check current state if data has changed to prevent re-renders; Redux?

const useApi = (props) => {
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [resultsFilter, setResultsFilter] = useState(null);
  let componentMounted = true;
  // const componentMounted = useRef(true);

  // Destruct props to extract values
  let {
    limit,
    sendRequest: propSendRequest,
    searchType,
    displayAmount,
    filter: propFilter,
    onRequestError,
  } = props;

  let parsedValues;

  if (!searchType) {
    searchType = "pets";
  }

  if (propFilter && searchType === "pets") {
    parsedValues = prepPetFilter(propFilter);
    if (!isEqual(parsedValues, resultsFilter)) {
      setResultsFilter(parsedValues);
    }
  } else if (propFilter && searchType === "organizations") {
    if (!isEqual(propFilter, resultsFilter)) {
      setResultsFilter(propFilter);
    }
  }

  useEffect(() => {
    // This async method makes our API request and parses it into an iterable array, which
    // is returned to whatever uses this hook. If props.sendRequest is false, do not
    // make a request.
    const makeRequest = async () => {
      let responseData = null;
      let parsedData;

      console.log("Requesting data...");

      if (requestError) {
        console.log("API request failed.... retrying..." + numRequestRetries);
        numRequestRetries++;
      }

      // Decide which type of request to make based on props.searchType
      switch (searchType) {
        case "pets":
          if (propFilter) {
            responseData = await petFinderClient.animal
              .search({ limit, ...resultsFilter })
              .catch((error) => {
                console.log(error);
                if (componentMounted) {
                  setRequestError(error);
                }
              });
          } else {
            responseData = await petFinderClient.animal
              .search({ limit })
              .catch((error) => {
                console.log(error);
                if (componentMounted) {
                  setRequestError(error);
                }
              });
          }

          // if data is returned from request, parse and store into parsedData
          if (responseData && !requestError) {
            parsedData = parsePetData(responseData);
          }
          break;

        case "organizations":
          if (propFilter) {
            responseData = await petFinderClient.organization
              .search({
                limit,
                ...resultsFilter,
              })
              .catch((error) => {
                console.log(error);
                if (componentMounted) {
                  setRequestError(error);
                }
              });
          } else {
            // Request organization data
            responseData = await petFinderClient.organization
              .search({
                limit,
              })
              .catch((error) => {
                console.log(error);
                if (componentMounted) {
                  setRequestError(error);
                }
              });
          }

          // if data is returned from request, parse and store into parsedData
          if (responseData && !requestError) {
            parsedData = parseOrganizationData(responseData);
          }
          break;

        default:
          responseData = null;
          break;
      }

      if (componentMounted) {
        // Log our data (for development purposes) and set our data state.
        console.log(responseData);
        setData(parsedData.slice(0, displayAmount));
      }

      if (requestError && numRequestRetries > 0) {
        onRequestError(requestError);
        numRequestRetries = 0;
      }
    };

    // If props.sendRequest is true, call makeRequest.
    // otherwise, do nothing.
    if (propSendRequest && numRequestRetries < 1) {
      console.log("Calling makeRequest...");
      makeRequest();
    }

    // useEffect cleanup
    return () => {
      setData(null);
      setRequestError(null);
      componentMounted = false;
    };
  }, [
    propSendRequest,
    displayAmount,
    limit,
    searchType,
    propFilter,
    requestError,
    props.filter,
    onRequestError,
    resultsFilter,
  ]);

  return data;
};
export default useApi;
