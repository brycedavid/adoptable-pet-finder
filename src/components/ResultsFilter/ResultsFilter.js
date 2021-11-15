import { useEffect, useState } from "react";

import classes from "./ResultsFilter.module.css";

import { Client } from "@petfinder/petfinder-js";

const petFinderClient = new Client({
  apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
  secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
});

const ResultsFilter = (props) => {
  const [locationValid, setLocationValid] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [filter, setFilter] = useState({
    type: "pets",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });

  let formIsValid = locationValid;

  const showFilterHandler = () => {
    setShowFilter(true);
  };

  const changeFilterHandler = (event) => {
    if (event.target.id === "breed-select") {
      setFilter({ ...filter, breed: event.target.value });
    } else if (event.target.id === "gender-select") {
      setFilter({ ...filter, gender: event.target.value });
    } else if (event.target.id === "age-select") {
      setFilter({ ...filter, age: event.target.value });
    } else if (event.target.id === "zip-input") {
      if (event.target.value.length < 5 && event.target.value.length !== 0) {
        setLocationValid(false);
        setFilter({ ...filter });
      } else if (isNaN(event.target.value)) {
        let newFilter = { ...filter };
        delete newFilter.location;
        setLocationValid(false);
        setFilter({ ...filter });
      } else if (event.target.value.length === 0) {
        let newFilter = { ...filter };
        delete newFilter.location;
        setLocationValid(true);
        setFilter({ ...newFilter });
      } else {
        setLocationValid(true);
        setFilter({ ...filter, location: event.target.value });
      }
    } else if (event.target.id === "type-select") {
      setFilter({ ...filter, type: event.target.value });
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.setPageFilter(filter);
  };

  useEffect(() => {
    const makeRequest = async () => {
      let response = null;

      if (filter.type === "dog") {
        response = await petFinderClient.animalData.breeds("dog");
        setBreeds(response.data.breeds);
      } else if (filter.type === "cat") {
        response = await petFinderClient.animalData.breeds("cat");
        setBreeds(response.data.breeds);
      } else {
        setBreeds([]);
      }
    };
    makeRequest();
  }, [filter.type]);

  let { type, breed, gender, age, zip } = filter;

  if (showFilter) {
    return (
      <form onSubmit={formSubmitHandler} className={classes["filter-form"]}>
        <label>Pet type</label>
        <select id="type-select" value={type} onChange={changeFilterHandler}>
          <option value="any">Any</option>
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
        </select>
        <label>Breed</label>
        <select id="breed-select" value={breed} onChange={changeFilterHandler}>
          <option value="any">any</option>
          {breeds.map((breed) => (
            <option value={breed.name} key={breed.name}>
              {breed.name}
            </option>
          ))}
        </select>
        <label>Gender</label>
        <select
          id="gender-select"
          value={gender}
          onChange={changeFilterHandler}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>
        <label>Age</label>
        <select id="age-select" value={age} onChange={changeFilterHandler}>
          <option value="young">Young</option>
          <option value="senior">Senior</option>
          <option value="any">Any</option>
        </select>
        <label>Location</label>
        <input
          id="zip-input"
          placeholder="zip code"
          onChange={changeFilterHandler}
          value={zip}
          maxLength="5"
        />
        <button
          type="submit"
          className={formIsValid ? "button-alt" : "button-alt disabled"}
          disabled={!formIsValid}
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <div
      className={classes["filter-container-closed"]}
      onClick={showFilterHandler}
    >
      <span>Filter results</span>
      <span> &#748;</span>
    </div>
  );
};

export default ResultsFilter;
