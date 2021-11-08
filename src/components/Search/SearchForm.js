// SearchForm.js
// This is the search form that is rendered on the Homepage and Item Display pages.
// It allows the user to retrieve pet data based on a search value.

import { Fragment, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import classes from "./SearchForm.module.css";

import Button from "../UI/Button";

const SearchForm = (props) => {
  const [searchFor, setSearchFor] = useState("");

  const history = useHistory();
  const selectValue = useRef();

  // Upon changing the select value...
  const selectChangeHandler = (event) => {
    setSearchFor(event.target.value);
  };

  // Upon submission, navigate to page associated with search value.
  const searchSubmitHandler = (event) => {
    // event.preventDefault();

    const value = selectValue.current.value;
    if (value === "centers") {
      history.push("/adoption-centers");
      return;
    }

    props.onSubmit(selectValue.current.value);
    history.push("/adoptable-pets");
  };

  return (
    <Fragment>
      <form
        className={classes["main-search-form"]}
        onSubmit={searchSubmitHandler}
      >
        <select
          value={searchFor}
          className={classes["search-form-select"]}
          onChange={selectChangeHandler}
          ref={selectValue}
        >
          {props.searchValue !== "cat" && <option value="cat">Cats</option>}
          {props.searchValue !== "dog" && <option value="dog">Dogs</option>}
          <option value="centers">Adoption Centers</option>
        </select>
        <Button class="button-main" text="Search" type="submit" />
      </form>
    </Fragment>
  );
};

export default SearchForm;
