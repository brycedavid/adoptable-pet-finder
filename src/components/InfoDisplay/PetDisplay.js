import { useEffect, useState, Fragment, useCallback } from "react";

import classes from "./PetDisplay.module.css";

import PetDisplayItem from "./PetDisplayItem";
import { fetchData } from "../../lib/api";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  const resetData = () => {
    setIsLoading(true);
    setParsedData(null);
  };

  const sendRequest = async () => {
    console.log("Requesting pet data...");
    const data = await fetchData({
      searchType: "pets",
      limit: props.limit,
      type: props.searchFor,
    });
    console.log(data);
    let dataArray = [];

    for (let animal of data.data.animals) {
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

    setParsedData(dataArray.slice(0, props.displayAmount));
    setIsLoading(false);
  };

  useEffect(() => {
    if (parsedData === null) {
      sendRequest();
    }
    return resetData;
  }, [fetchData, setParsedData, setIsLoading]);

  if (isLoading) {
    return (
      <div className={classes["loading-text-container"]}>
        <p className={classes["loading-text"]}>Loading...</p>
      </div>
    );
  }

  if (!isLoading) {
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
};

export default PetDisplay;
