import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";

import { Client } from "@petfinder/petfinder-js";

import { apiKey, secret } from "../../shared/constants";

const petFinderClient = new Client({
  apiKey,
  secret,
});

const PetFilter = (props) => {
  const petFilterRedux = useSelector((state) => state.petFilter);
  const duplicatePetFilter = useSelector((state) => state.duplicatePetFilter);

  const [locationValid, setLocationValid] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [lastFilter, setLastFilter] = useState(null);
  const [petFilter, setPetFilter] = useState(petFilterRedux);

  let dispatch = useDispatch();

  let formIsValid = locationValid;

  const changeBreedHandler = (event) => {
    setPetFilter({ ...petFilter, breed: event.target.value });
  };

  const changeGenderHandler = (event) => {
    setPetFilter({ ...petFilter, gender: event.target.value });
  };

  const changeAgeHandler = (event) => {
    setPetFilter({ ...petFilter, age: event.target.value });
  };

  const changeTypeHandler = (event) => {
    setPetFilter({
      ...petFilter,
      breed: "any",
      type: event.target.value,
    });
  };

  const changeZipHandler = (event) => {
    if (event.target.value.length < 5 && event.target.value.length !== 0) {
      setLocationValid(false);
      setPetFilter({ ...petFilter, location: event.target.value });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setPetFilter({ ...petFilter, location: event.target.value });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setPetFilter({ ...petFilter, location: event.target.value });
    } else if (event.target.value.length === 0) {
      let newFilter = { ...petFilter };
      if (newFilter.location) {
        delete newFilter.location;
      }
      setLocationValid(true);
      setPetFilter({ ...newFilter });
    } else {
      setLocationValid(true);
      setPetFilter({ ...petFilter, location: event.target.value });
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 200, behavior: "smooth" });
    setLastFilter(petFilter);
    if (petFilter.location !== "") {
      props.setPageFilter(petFilter);
      dispatch({
        type: "UPDATE_PET_FILTER",
        payload: petFilter,
      });
    } else {
      let newFilter = { ...petFilter };
      delete newFilter.location;
      props.setPageFilter(newFilter);
      dispatch({
        type: "UPDATE_PET_FILTER",
        payload: newFilter,
      });
    }
    dispatch({
      type: "UPDATE_PET_FILTER",
      payload: petFilter,
    });
  };

  // Retrieves the available Breeds for either cats or dogs
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

    makeRequest();
  }, [petFilter.type]);

  // If our filter equals the last filter used, disable submit button
  if (isEqual(petFilter, lastFilter) || isEqual(petFilter, props.homeFilter)) {
    formIsValid = false;
  }

  return (
    <form onSubmit={formSubmitHandler} className="filter-form sticky">
      <label>Pet type</label>
      <select
        className={"filter-input"}
        id="type-select"
        value={petFilter.type}
        onChange={changeTypeHandler}
      >
        <option value="any">All</option>
        <option value="cat">Cats</option>
        <option value="dog">Dogs</option>
      </select>
      <label>Breed</label>
      <select
        className={"filter-input"}
        id="breed-select"
        value={petFilter.breed}
        onChange={changeBreedHandler}
      >
        <option value="any">All</option>
        {breeds.map((breed) => (
          <option value={breed.name} key={breed.name}>
            {breed.name}
          </option>
        ))}
      </select>
      <label>Gender</label>
      <select
        className={"filter-input"}
        id="gender-select"
        value={petFilter.gender}
        onChange={changeGenderHandler}
      >
        <option value="any">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <label>Age</label>
      <select
        className={"filter-input"}
        id="age-select"
        value={petFilter.age}
        onChange={changeAgeHandler}
      >
        <option value="any">All</option>
        <option value="baby">Baby</option>
        <option value="young">Young</option>
        <option vlue="adult">Adult</option>
        <option value="senior">Senior</option>
      </select>
      <label>Location</label>
      <input
        className={"filter-input"}
        id="zip-input"
        placeholder="zip code"
        onChange={changeZipHandler}
        value={petFilter.location ? petFilter.location : ""}
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

export default PetFilter;
