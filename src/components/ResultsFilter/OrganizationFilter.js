import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";

const OrganizationFilter = (props) => {
  const orgFilterRedux = useSelector((state) => state.orgFilter);
  const lastOrgFilterRedux = useSelector((state) => state.lastOrgFilter);

  const [locationValid, setLocationValid] = useState(true);
  const [lastFilter, setlastFilter] = useState(lastOrgFilterRedux);
  const [filter, setFilter] = useState(orgFilterRedux);
  const [duplicateFilter, setDuplicateFilter] = useState(false);

  let dispatch = useDispatch();

  let formIsValid = locationValid;

  const changeZipHandler = (event) => {
    if (event.target.value.length < 5 && event.target.value.length !== 0) {
      setLocationValid(false);
      setFilter({
        ...filter,
        location: event.target.value,
      });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setFilter({
        ...filter,
        location: event.target.value,
      });
    } else if (isNaN(event.target.value)) {
      setLocationValid(false);
      setFilter({
        ...filter,
        location: event.target.value,
      });
    } else if (event.target.value.length === 0) {
      let newFilter = { ...filter };
      if (newFilter.location) {
        delete newFilter.location;
      }
      setLocationValid(true);
      setFilter({ ...newFilter });
    } else {
      setLocationValid(true);
      setFilter({
        ...filter,
        location: event.target.value,
      });
    }
    if (!isEqual(filter, lastFilter)) {
      setDuplicateFilter(false);
    } else {
      setDuplicateFilter(true);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 200, behavior: "smooth" });
    props.setPageFilter(filter);
    dispatch({
      type: "UPDATE_LAST_ORG_FILTER",
      payload: filter.location,
    });
    dispatch({
      type: "UPDATE_ORG_FILTER",
      payload: filter.location,
    });
    setDuplicateFilter(true);
  };

  // If our filter equals the last filter used, disable submit button
  if (isEqual(filter, lastFilter) && duplicateFilter === false) {
    setDuplicateFilter(true);
    formIsValid = false;
  }
  if (duplicateFilter) {
    formIsValid = false;
  }

  return (
    <form
      onSubmit={formSubmitHandler}
      className="filter-form-organization sticky"
    >
      <label>Location</label>
      <input
        className={"filter-input"}
        id="zip-input"
        placeholder="zip code"
        onChange={changeZipHandler}
        value={filter.location ? filter.location : ""}
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

export default OrganizationFilter;
