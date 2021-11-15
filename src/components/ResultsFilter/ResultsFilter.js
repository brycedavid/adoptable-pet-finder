import { useState } from "react";

import classes from "./ResultsFilter.module.css";

//**** Implement your selects by mapping an array of the values *//

const ResultsFilter = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    type: "pets",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });

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
      setFilter({ ...filter, location: event.target.value });
    } else if (event.target.id === "type-select") {
      setFilter({ ...filter, type: event.target.value });
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.setPageFilter(filter);
  };

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
          <option value="labrador retriever">Labrador Retriever</option>
          <option value="poodle">Poodle</option>
          <option value="any">Any</option>
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
        />
        <button type="submit" className="button-alt">
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
