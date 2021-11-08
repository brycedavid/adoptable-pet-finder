// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import { useState } from "react";

import PetDisplay from "../components/InfoDisplay/PetDisplay";
import SearchForm from "../components/Search/SearchForm";
import Card from "../components/UI/Card";

// Helper method which coverts any string to capital case.
// Used for page header, which is dynamic based on what's searched for.
const capitalize = (string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};

const AdoptablePets = (props) => {
  const searchFormSubmitHandler = (searchValue) => {
    props.forwardFormData(searchValue);
  };

  return (
    <div className="main-content">
      <h1>
        {props.searchData
          ? `Adoptable ${capitalize(props.searchData)}s`
          : "Adoptable Pets"}
      </h1>
      <PetDisplay limit={96} displayAmount={96} searchFor={props.searchData} />
      <Card class="main-search-container">
        {/* <SearchForm
          onSubmit={searchFormSubmitHandler}
          searchValue={props.searchData}
        /> */}
      </Card>
    </div>
  );
};

export default AdoptablePets;
