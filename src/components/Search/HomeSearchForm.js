import { Fragment, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";

import classes from "./HomeSearchForm.module.css";

const HomeSearchForm = (props) => {
  const [searchFor, setSearchFor] = useState("");

  const history = useHistory();
  const selectValue = useRef();

  const selectChangeHandler = (event) => {
    setSearchFor(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();

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
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
          <option value="centers">Adoption Centers</option>
        </select>
        <Button class="search" text="Search" type="submit" />
      </form>
    </Fragment>
  );
};

export default HomeSearchForm;
