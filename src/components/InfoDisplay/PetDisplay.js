import { useEffect, useState, Fragment } from "react";

import classes from "./PetDisplay.module.css";

import PetDisplayItem from "./PetDisplayItem";
import Card from "../UI/Card";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    let response;

    const fetchPets = async () => {
      console.log("API request triggered: Home Featured Pets Display");
      try {
        response = await props.client.animal.search({
          limit: 25,
        });

        if (response.status !== 200) {
          throw new Error("Request failed!");
        }
      } catch (err) {
        console.log(err.message || "Something went wrong... please try again.");
      }
      console.log(response);

      let dataArray = [];

      for (let animal of response.data.animals) {
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

      setParsedData(dataArray.slice(0, 10));
      setIsLoading(false);
    };

    fetchPets();
    return () => {
      setIsLoading(false);
      setParsedData(null);
    };
  }, [props.client]);

  if (isLoading) {
    return (
      <div className={classes["loading-text-container"]}>
        <p className={classes["loading-text"]}>Loading...</p>
      </div>
    );
  }
  if (!isLoading) {
    return (
      <Fragment>
        <h2 className={classes["feature-text"]}>Featured Pets</h2>
        <Card class="pet-display-container">
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
        </Card>
      </Fragment>
    );
  }
};

export default PetDisplay;
