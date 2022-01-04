import React, { useEffect, useState } from "react";
import isEqual from "react-fast-compare";

import { Client } from "@petfinder/petfinder-js";

import { apiKey, secret } from "../../shared/constants";
import { useDispatch, useSelector } from "react-redux";

const petFinderClient = new Client({
  apiKey,
  secret,
});

const ResultsFilter = (props) => {
  const orgFilterRedux = useSelector((state) => state.orgFilter);
  const lastOrgFilterRedux = useSelector((state) => state.lastOrgFilter);
  const petFilterRedux = useSelector((state) => state.petFilter);
  const duplicatePetFilter = useSelector((state) => state.duplicatePetFilter);

  const [locationValid, setLocationValid] = useState(true);
  const [filterFor, setFilterFor] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [lastFilter, setLastFilter] = useState(null);
  const [lastOrgFilter, setLastOrgFilter] = useState(lastOrgFilterRedux);
  const [petFilter, setPetFilter] = useState({
    type: "pets",
    breed: "any",
    gender: "any",
    age: "any",
  });
  const [organizationFilter, setOrganizationFilter] = useState(orgFilterRedux);
  const [duplicateOrgFilter, setDuplicateOrgFilter] = useState(false);

  let dispatch = useDispatch();

  if (props.for && props.for !== filterFor) {
    setFilterFor(props.for);
  }

  let formIsValid = locationValid;
  let duplicateFilter;

  if (filterFor === "petDisplay") {
    duplicateFilter = duplicatePetFilter;
  } else {
    duplicateFilter = duplicateOrgFilter;
  }

  const changePetBreedHandler = (event) => {
    setPetFilter({ ...petFilter, breed: event.target.value });
  };

  const changePetGenderHandler = (event) => {
    setPetFilter({ ...petFilter, gender: event.target.value });
  };

  const changePetAgeHandler = (event) => {
    setPetFilter({ ...petFilter, age: event.target.value });
  };

  const changePetTypeHandler = (event) => {
    setPetFilter({
      ...petFilter,
      breed: "any",
      type: event.target.value,
    });
  };

  const changePetZipHandler = (event) => {
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

  const changeOrganizationZipHandler = (event) => {
    if (event.target.value.length < 5 && event.target.value.length !== 0) {
      setLocationValid(false);
      setOrganizationFilter({
        ...organizationFilter,
        location: event.target.value,
      });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setOrganizationFilter({
        ...organizationFilter,
        location: event.target.value,
      });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setOrganizationFilter({
        ...organizationFilter,
        location: event.target.value,
      });
    } else if (event.target.value.length === 0) {
      let newFilter = { ...organizationFilter };
      if (newFilter.location) {
        delete newFilter.location;
      }
      setLocationValid(true);
      setOrganizationFilter({ ...newFilter });
    } else {
      setLocationValid(true);
      setOrganizationFilter({
        ...organizationFilter,
        location: event.target.value,
      });
    }
    if (!isEqual(organizationFilter, lastOrgFilter)) {
      setDuplicateOrgFilter(false);
    } else {
      setDuplicateOrgFilter(true);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 200, behavior: "smooth" });
    if (filterFor === "petDisplay") {
      setLastFilter(petFilter);
      props.setPageFilter(petFilter);
    } else {
      props.setPageFilter(organizationFilter);
      dispatch({
        type: "UPDATE_LAST_ORG_FILTER",
        payload: organizationFilter.location,
      });
      dispatch({
        type: "UPDATE_ORG_FILTER",
        payload: organizationFilter.location,
      });
      setDuplicateOrgFilter(true);
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
  }, [petFilter.type, filterFor]);

  // If our filter equals the last filter used, disable submit button
  if (isEqual(petFilter, lastFilter) || isEqual(petFilter, props.homeFilter)) {
    duplicateFilter = true;
    formIsValid = false;
  }

  if (
    isEqual(organizationFilter, lastOrgFilter) &&
    duplicateOrgFilter === false
  ) {
    setDuplicateOrgFilter(true);
    duplicateFilter = true;
    formIsValid = false;
  }
  if (duplicateOrgFilter) {
    duplicateFilter = true;
    formIsValid = false;
  }

  let toRender;

  if (filterFor === "petDisplay") {
    toRender = (
      <React.Fragment>
        <label>Pet type</label>
        <select
          className={"filter-input"}
          id="type-select"
          value={petFilter.type}
          onChange={changePetTypeHandler}
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
          onChange={changePetBreedHandler}
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
          onChange={changePetGenderHandler}
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
          onChange={changePetAgeHandler}
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
          onChange={changePetZipHandler}
          value={petFilter.location ? petFilter.location : ""}
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
        <label>Location</label>
        <input
          className={"filter-input"}
          id="zip-input"
          placeholder="zip code"
          onChange={changeOrganizationZipHandler}
          value={organizationFilter.location ? organizationFilter.location : ""}
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
    <form
      onSubmit={formSubmitHandler}
      className={
        filterFor === "petDisplay"
          ? "filter-form sticky"
          : "filter-form-organization sticky"
      }
    >
      {toRender}
    </form>
  );
};

export default ResultsFilter;
