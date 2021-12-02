// SearchForm.js
// This is the search form that is rendered on the Homepage and Item Display pages.
// It allows the user to retrieve pet data based on a search value.

import { Fragment, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchForm = (props) => {
  const [searchFor, setSearchFor] = useState("");

  const history = useHistory();
  const selectValue = useRef();

  // Upon changing the select value...
  const selectChangeHandler = (event) => {
    setSearchFor(event.target.value);
  };

  // Upon submission, navigate to page associated with search value.
  const searchSubmitHandler = () => {
    const value = selectValue.current.value;
    if (value === "centers") {
      history.push("/adoption-centers");
      return;
    } else if (value === "pets") {
      history.push("/adoptable-pets");
    }
  };

  return (
    <Fragment>
      <form className="main-search-form" onSubmit={searchSubmitHandler}>
        <p>
          <b>Search Pets or Adoption Centers</b>
        </p>
        <select
          value={searchFor}
          className="search-form-select"
          onChange={selectChangeHandler}
          ref={selectValue}
        >
          <option value="pets">Available Pets</option>
          <option value="centers">Adoption Centers</option>
        </select>
        <button className="button-main" type="submit">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default SearchForm;
