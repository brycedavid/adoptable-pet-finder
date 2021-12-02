// use-api.js
// This component is implemented as a custom hook, which is called to perform API requests
// related to pet information from the Petfinder API. Configured to be re-usable for any search
// using the props parameter.

import { useState, useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

import isEqual from "react-fast-compare";

import {
  parseOrganizationData,
  parsePetData,
  prepPetFilter,
  prepOrgFilter,
} from "../shared/utils/parseData";

// Controls how many times a request is retried
let numRequestRetries = 0;

// Our client object, which is required to make API requests to the Petfinder API
let petFinderClient = null;

const useApi = (props) => {
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [resultsFilter, setResultsFilter] = useState(null);
  let componentMounted = true;

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
    parsedValues = prepOrgFilter(propFilter);
    if (!isEqual(parsedValues, resultsFilter)) {
      setResultsFilter(parsedValues);
    }
  }

  useEffect(() => {
    // This async method makes our API request and parses it into an iterable array, which
    // is returned to whatever uses this hook. If props.sendRequest is false, do not
    // make a request.
    const makeRequest = async () => {
      let dbResponseData = null;
      let responseData = null;
      let parsedData;
      let client;

      if (petFinderClient === null) {
        console.log("Requesting API info...");
        dbResponseData = await fetch(
          "https://stalwart-fx-307719-default-rtdb.firebaseio.com/JuDjkI.json",
          { method: "GET" }
        );

        if (!dbResponseData.ok) {
          throw new Error("Could not retrieve Client key/secret");
        }

        await dbResponseData.json().then((data) => {
          let forbiddenChars = ["?", "&", "=", "."];
          for (let char of forbiddenChars) {
            data.sKdnH = data.sKdnH.split(char).join("");
            data.julncD = data.julncD.split(char).join("");
          }

          client = new Client({
            apiKey: data.sKdnH,
            secret: data.julncD,
          });

          console.log("Petfinder client updated");
          petFinderClient = client;
        });
      }

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
