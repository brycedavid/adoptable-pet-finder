import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";

const OrganizationFilter = (props) => {
  const orgFilterRedux = useSelector((state) => state.orgFilter);

  const [locationValid, setLocationValid] = useState(true);
  const [lastFilter, setLastFilter] = useState(orgFilterRedux);
  const [filter, setFilter] = useState(orgFilterRedux);
  const [duplicateFilter, setDuplicateFilter] = useState(true);
  const [mobileFormExpanded, setMobileFormExpanded] = useState(false);

  let dispatch = useDispatch();

  let formIsValid = locationValid && !duplicateFilter;

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
    } else if (event.target.value.length === 0) {
      if (lastFilter.location !== "") {
        setLocationValid(true);
      } else {
        setLocationValid(false);
      }
      setFilter({ location: "" });
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
      type: "UPDATE_ORG_FILTER",
      payload: filter.location,
    });
    setLastFilter({ location: filter.location });
    setFilter({ location: filter.location });
    setDuplicateFilter(true);
  };

  // If our filter equals the last filter used, disable submit button by setting duplicateFilter to true
  if (isEqual(filter, lastFilter) && duplicateFilter === false) {
    setDuplicateFilter(true);
  }

  const mobileFormExpandHandler = () => {
    setMobileFormExpanded(true);
  };

  const mobileFormCollapseHandler = () => {
    setMobileFormExpanded(false);
  };

  if (props.mobileVersion && !mobileFormExpanded) {
    return (
      <div className="filter-form--mobile-collapsed-org">
        <button className="btn__mobile-form" onClick={mobileFormExpandHandler}>
          Filter Results &#9660;
        </button>
      </div>
    );
  } else {
    return (
      <form onSubmit={formSubmitHandler} className="filter-form--org sticky">
        <label>Location</label>
        <input
          className="filter-form__input"
          id="zip-input"
          placeholder="zip code"
          onChange={changeZipHandler}
          onKeyUp={changeZipHandler}
          value={filter.location ? filter.location : ""}
          maxLength="5"
        />
        <button
          type="submit"
          className={formIsValid ? "btn--alt" : "btn--alt disabled"}
          disabled={!formIsValid}
        >
          Search
        </button>
        {props.mobileVersion && (
          <button
            className="btn__mobile-form"
            onClick={mobileFormCollapseHandler}
          >
            Hide Filter &#9650;
          </button>
        )}
      </form>
    );
  }
};

export default OrganizationFilter;
