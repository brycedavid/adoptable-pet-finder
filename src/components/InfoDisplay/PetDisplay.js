import { useState } from "react";

import classes from "./PetDisplay.module.css";

import PetDisplayItem from "./PetDisplayItem";
import useApi from "../../hooks/use-api";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  let sendRequest = false;

  if (parsedData === null && isLoading === true) {
    sendRequest = true;
  }

  const data = useApi({
    searchType: "pets",
    limit: props.limit,
    type: props.searchFor,
    sendRequest,
    displayAmount: props.displayAmount,
  });

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
    );
  }

  return (
    <div className={classes["loading-text-container"]}>
      <p className={classes["loading-text"]}>Loading...</p>
    </div>
  );
};

export default PetDisplay;
