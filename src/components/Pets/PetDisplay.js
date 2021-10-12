import { Client } from "@petfinder/petfinder-js";
import { useEffect, useState, Fragment } from "react";

import classes from "./PetDisplay.module.css";

import DisplayItem from "./DisplayItem";
import Card from "../UI/Card";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

  const petFinderClient = new Client({
    apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
    secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
  });

  useEffect(() => {
    let response;
    const fetchPets = async () => {
      console.log("API request triggered");
      try {
        response = await petFinderClient.animal.search({
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
        if (animal.photos.length !== 0) {
          dataArray.push({
            key: animal.id,
            id: animal.id,
            name: animal.name,
            age: animal.age,
            fixed: animal.attributes.spayed_neutered,
            pictures: animal.photos,
            url: animal.url,
          });
        }
      }

      setParsedData(dataArray.slice(0, 8));
      setIsLoading(false);
    };

    fetchPets();
  }, []);

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
            <DisplayItem
              key={animal.key}
              name={animal.name}
              age={animal.age}
              fixed={animal.fixed}
              pictures={animal.pictures}
            />
          ))}
        </Card>
      </Fragment>
    );
  }
};

export default PetDisplay;
