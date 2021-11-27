import React, { useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import { Client } from "@petfinder/petfinder-js";

import { apiKey, secret } from "../../shared/constants";

const petFinderClient = new Client({
  apiKey,
  secret,
});

const ResultsFilter = (props) => {
  const [locationValid, setLocationValid] = useState(true);
  const [filterFor, setFilterFor] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [lastFilter, setLastFilter] = useState(null);
  const [petFilter, setPetFilter] = useState({
    type: "pets",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });
  const [organizationFilter, setOrganizationFilter] = useState({});

  if (props.for && props.for !== filterFor) {
    setFilterFor(props.for);
  }

  let formIsValid = locationValid;
  let duplicateFilter = false;

  const changeFilterHandler = (event) => {
    if (filterFor === "petDisplay") {
      let newFilter = { ...petFilter };
      switch (event.target.id) {
        case "breed-select":
          setPetFilter({ ...newFilter, breed: event.target.value });
          break;
        case "gender-select":
          setPetFilter({ ...newFilter, gender: event.target.value });
          break;
        case "age-select":
          setPetFilter({ ...newFilter, age: event.target.value });
          break;
        case "type-select":
          setPetFilter({
            ...petFilter,
            breed: "any",
            type: event.target.value,
          });
          break;
        case "zip-input":
          if (
            event.target.value.length < 5 &&
            event.target.value.length !== 0
          ) {
          } else if (isNaN(event.target.value)) {
            setLocationValid(false);
            setPetFilter({ ...newFilter });
          } else if (isNaN(event.target.value)) {
            delete newFilter.location;
            setLocationValid(false);
            setPetFilter({ ...newFilter });
          } else if (event.target.value.length === 0) {
            delete newFilter.location;
            setLocationValid(true);
            setPetFilter({ ...newFilter });
          } else {
            delete newFilter.location;
            setLocationValid(true);
            setPetFilter({ ...newFilter, location: event.target.value });
          }
          break;
        default:
          break;
      }
    } else if (filterFor === "organizationDisplay") {
      switch (event.target.id) {
        case "zip-input":
          if (
            event.target.value.length < 5 &&
            event.target.value.length !== 0
          ) {
            setLocationValid(false);
            setOrganizationFilter({ ...organizationFilter });
          } else if (isNaN(event.target.value)) {
            let newFilter = { ...organizationFilter };
            delete newFilter.location;
            setLocationValid(false);
            setOrganizationFilter({ ...organizationFilter });
          } else if (event.target.value.length === 0) {
            let newFilter = { ...organizationFilter };
            delete newFilter.location;
            setLocationValid(true);
            setOrganizationFilter({ ...newFilter });
          } else {
            setLocationValid(true);
            setOrganizationFilter({
              ...organizationFilter,
              location: event.target.value,
            });
          }
          break;
      }
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 147, behavior: "smooth" });
    if (filterFor === "petDisplay") {
      setLastFilter(petFilter);
      props.setPageFilter(petFilter);
    } else {
      setLastFilter(organizationFilter);
      props.setPageFilter(organizationFilter);
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      let response = null;

      if (petFilter.type === "dog") {
        response = await petFinderClient.animalData.breeds("dog");
        setBreeds(response.data.breeds);
      } else if (petFilter.type === "cat") {
        response = await petFinderClient.animalData.breeds("cat");
        setBreeds(response.data.breeds);
      } else {
        setBreeds([]);
      }
    };

    if (filterFor === "petDisplay") {
      makeRequest();
    }
  }, [petFilter.type]);

  let type, breed, gender, age, zip;

  if (filterFor === "petDisplay") {
    type = petFilter.type;
    breed = petFilter.breed;
    gender = petFilter.gender;
    age = petFilter.age;
    if (petFilter.location !== "any") {
      zip = petFilter.location;
    }
  }

  // If our filter equals the last filter used, disable submit button
  if (isEqual(petFilter, lastFilter) || isEqual(petFilter, props.homeFilter)) {
    duplicateFilter = true;
    formIsValid = false;
  }

  if (isEqual(organizationFilter, lastFilter)) {
    duplicateFilter = true;
    formIsValid = false;
  }

  let toRender;

  if (filterFor === "petDisplay") {
    toRender = (
      <React.Fragment>
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
          title={
            duplicateFilter
              ? "Search filters are the same; try a different filter"
              : ""
          }
        >
          Search
        </button>
      </React.Fragment>
    );
  } else {
    toRender = (
      <React.Fragment>
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
          title={
            duplicateFilter
              ? "Search filters are the same; try a different filter"
              : ""
          }
        >
          Search
        </button>
      </React.Fragment>
    );
  }

  return (
    <form onSubmit={formSubmitHandler} className="filter-form sticky">
      {toRender}
    </form>
  );
};

export default ResultsFilter;
