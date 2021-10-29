import { useState } from "react";

import classes from "./AdoptionCenterDisplay.module.css";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  let sendRequest = false;

  if (parsedData === null && isLoading === true) {
    sendRequest = true;
  }

  const data = useApi({
    searchType: "organizations",
    limit: props.limit,
    type: null,
    sendRequest,
    displayAmount: 75,
  });

  if (data && isLoading === true) {
    setIsLoading(false);
    setParsedData(data);
  }

  const resetData = () => {
    setIsLoading(true);
    setParsedData(null);
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading) {
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
};

export default AdoptionCenterDisplay;
