import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";

import useFirebase from "../../hooks/useFirebase";

// Our client object, which is required to make API requests to the Petfinder API
let petFinderClient = null;

const PetFilter = (props) => {
  const petFilterRedux = useSelector((state) => state.petFilter);

  const [locationValid, setLocationValid] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [lastFilter, setLastFilter] = useState(petFilterRedux);
  const [petFilter, setPetFilter] = useState(petFilterRedux);
  const [duplicateFilter, setDuplicateFilter] = useState(true);

  let dispatch = useDispatch();

  let formIsValid = locationValid && !duplicateFilter;

  const changeBreedHandler = (event) => {
    let newFilter = { ...petFilter, breed: event.target.value };
    setPetFilter(newFilter);
    if (!isEqual(newFilter, lastFilter)) {
      setDuplicateFilter(false);
    } else {
      setDuplicateFilter(true);
    }
  };

  const changeGenderHandler = (event) => {
    let newFilter = { ...petFilter, gender: event.target.value };
    setPetFilter({ ...petFilter, gender: event.target.value });
    if (!isEqual(newFilter, lastFilter)) {
      setDuplicateFilter(false);
    } else {
      setDuplicateFilter(true);
    }
  };

  const changeAgeHandler = (event) => {
    let newFilter = { ...petFilter, age: event.target.value };
    setPetFilter(newFilter);
    if (!isEqual(newFilter, lastFilter)) {
      setDuplicateFilter(false);
    } else {
      setDuplicateFilter(true);
    }
  };

  const changeTypeHandler = (event) => {
    let newFilter = {
      ...petFilter,
      breed: "any",
      type: event.target.value,
    };
    setPetFilter(newFilter);
    if (!isEqual(newFilter, lastFilter)) {
      setDuplicateFilter(false);
    } else {
      setDuplicateFilter(true);
    }
  };

  const changeZipHandler = (event) => {
    if (event.target.value.length < 5 && event.target.value.length !== 0) {
      setLocationValid(false);
      setPetFilter({ ...petFilter, location: event.target.value });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setPetFilter({ ...petFilter, location: event.target.value });
    } else if (event.target.value.length === 0) {
      if (lastFilter.location !== "" || !duplicateFilter) {
        setLocationValid(true);
      } else {
        setLocationValid(false);
      }
      setPetFilter({ ...petFilter, location: "" });
    } else {
      setLocationValid(true);
      setPetFilter({ ...petFilter, location: event.target.value });
    }
    if (!isEqual(petFilter, lastFilter)) {
      setDuplicateFilter(false);
    } else {
      setDuplicateFilter(true);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 200, behavior: "smooth" });
    props.setPageFilter(petFilter);
    dispatch({
      type: "UPDATE_PET_FILTER",
      payload: petFilter,
    });
    setLastFilter(petFilter);
    setPetFilter(petFilter);
    setDuplicateFilter(true);
  };

  petFinderClient = useFirebase("petfinder");

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
  if (isEqual(petFilter, lastFilter) && duplicateFilter === false) {
    setDuplicateFilter(true);
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
        onKeyUp={changeZipHandler}
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
