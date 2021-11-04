// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import { useState } from "react";

import classes from "./PetDisplay.module.css";

import PetDisplayItem from "./PetDisplayItem";
import useApi from "../../hooks/use-api";
import LoadingIndicator from "../UI/LoadingIndicator";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  // Determines whether or not we should send a request
  let sendRequest = false;

  // If there is no data and isLoading is true (initial component render), send a request
  if (parsedData === null && isLoading === true) {
    sendRequest = true;
  }

  // Request pet data
  const data = useApi({
    searchType: "pets",
    limit: props.limit,
    type: props.searchFor,
    sendRequest,
    displayAmount: props.displayAmount,
  });

  // If isLoading is true and some data was received, setParsedData and set isLoading to false.
  if (data && isLoading === true) {
    setIsLoading(false);
    setParsedData(data);
  }

  const resetData = () => {
    setIsLoading(true);
    setParsedData(null);
  };

  if (!isLoading && parsedData !== null) {
    return (
      <div className={classes["display-item-container"]}>
        <div className={classes["pet-display-container"]}>
          {parsedData.map((animal) => (
            <PetDisplayItem
              key={animal.key}
              name={animal.name}
              age={animal.age}
              fixed={animal.fixed}
              pictures={animal.pictures}
              url={animal.url}
              type={animal.type}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={classes["loading-indicator-container"]}>
      <LoadingIndicator />
    </div>
  );
};

export default PetDisplay;
