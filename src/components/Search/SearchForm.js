import { Fragment, useState, useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

import Button from "../UI/Button";
// import useApi from "../../hooks/use-api";

import classes from "./SearchForm.module.css";

const SearchForm = () => {
  const [searchFor, setSearchFor] = useState("");

  const petFinderClient = new Client({
    apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
    secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
  });

  // const { sendRequest: fetchData } = useApi(petFinderClient, searchFor);

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
