// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import { useState } from "react";

import classes from "./AdoptionCenterDisplay.module.css";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  // Determines whether or not we should send a request
  let sendRequest = false;

  // If there is no data and isLoading is true (initial component render), send a request
  if (parsedData === null && isLoading === true) {
    sendRequest = true;
  }

  // Request organization data
  const data = useApi({
    searchType: "organizations",
    limit: props.limit,
    type: null,
    sendRequest,
    displayAmount: 75,
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
      <div className={classes["adoption-center-display-container"]}>
        {parsedData.map((organization) => (
          <AdoptionCenterDisplayItem
            key={organization.key}
            id={organization.id}
            address={organization.address}
            name={organization.name}
            phone={organization.phone}
            url={organization.url}
            animalsLink={organization.animalsLink}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default AdoptionCenterDisplay;
