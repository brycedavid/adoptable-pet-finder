import { Fragment, useState, useEffect } from "react";

import Button from "../UI/Button";

import classes from "./SearchForm.module.css";

const SearchForm = () => {
  const [searchFor, setSearchFor] = useState("");

  const selectChangeHandler = (event) => {
    setSearchFor(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    console.log(searchFor);
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
        >
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
          <option value="centers">Adoption Centers</option>
        </select>
        <Button class="main" text="Search" type="submit" />
      </form>
    </Fragment>
  );
};

export default SearchForm;
