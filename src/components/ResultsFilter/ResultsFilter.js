import { useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import { Client } from "@petfinder/petfinder-js";

import { apiKey, secret } from "../../shared/constants";

const petFinderClient = new Client({
  apiKey,
  secret,
});

const ResultsFilter = (props) => {
  const [locationValid, setLocationValid] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [lastFilter, setLastFilter] = useState(null);
  const [filter, setFilter] = useState({
    type: "pets",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });

  let formIsValid = locationValid;

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
      setFilter({ ...filter, breed: "any", type: event.target.value });
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setLastFilter(filter);
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

  // If our filter equals the last filter used, disable submit button
  if (isEqual(filter, lastFilter) || isEqual(filter, props.homeFilter)) {
    formIsValid = false;
  }

  return (
    <form onSubmit={formSubmitHandler} className={"filter-form"}>
      <label className="filter-form-label">Pet type</label>
      <select
        className={"filter-input"}
        id="type-select"
        value={type}
        onChange={changeFilterHandler}
      >
        <option value="any">All</option>
        <option value="cat">Cats</option>
        <option value="dog">Dogs</option>
      </select>
      <label className="filter-form-label">Breed</label>
      <select
        className={"filter-input"}
        id="breed-select"
        value={breed}
        onChange={changeFilterHandler}
      >
        <option value="any">All</option>
        {breeds.map((breed) => (
          <option value={breed.name} key={breed.name}>
            {breed.name}
          </option>
        ))}
      </select>
      <label className="filter-form-label">Gender</label>
      <select
        className={"filter-input"}
        id="gender-select"
        value={gender}
        onChange={changeFilterHandler}
      >
        <option value="any">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <label className="filter-form-label">Age</label>
      <select
        className={"filter-input"}
        id="age-select"
        value={age}
        onChange={changeFilterHandler}
      >
        <option value="any">All</option>
        <option value="baby">Baby</option>
        <option value="young">Young</option>
        <option vlue="adult">Adult</option>
        <option value="senior">Senior</option>
      </select>
      <label className="filter-form-label">Location</label>
      <input
        className={"filter-input"}
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
};

export default ResultsFilter;
