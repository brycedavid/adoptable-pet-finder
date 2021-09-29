import { Fragment } from "react";

import Button from "../UI/Button";

import classes from "./SearchForm.module.css";

const SearchForm = () => {
  return (
    <Fragment>
      <form className={classes["main-search-form"]}>
        <select className={classes["search-form-select"]}>
          <option>Cats</option>
          <option>Dogs</option>
          <option>Adoption Centers</option>
        </select>
        <Button class="main" text="Search" type="submit" />
      </form>
    </Fragment>
  );
};

export default SearchForm;
