// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import { useState } from "react";
import PetDisplay from "../components/InfoDisplay/PetDisplay";
import ResultsFilter from "../components/ResultsFilter/ResultsFilter";
import isEqual from "react-fast-compare";

// Helper method which coverts any string to capital case.
// Used for page header, which is dynamic based on what's searched for.
const capitalize = (string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};

const AdoptablePets = (props) => {
  const [filter, setFilter] = useState(null);
  const [homeSearchFor, setHomeSearchFor] = useState(null);

  if (props.searchData && homeSearchFor === null && filter === null) {
    setHomeSearchFor({ type: props.searchData });
  }

  const setFilterHandler = (filterValues) => {
    setFilter({ ...filterValues });
    setHomeSearchFor(null);
  };

  return (
    <div className="main-content">
      <ResultsFilter setPageFilter={setFilterHandler} />
      <h1>{"Adoptable Pets"}</h1>
      <PetDisplay
        petsFilter={filter}
        homeSearchFor={homeSearchFor}
        limit={96}
        displayAmount={96}
      />
    </div>
  );
};

export default AdoptablePets;
