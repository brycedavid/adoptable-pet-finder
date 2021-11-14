// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import { useState } from "react";
import PetDisplay from "../components/InfoDisplay/PetDisplay";
import ResultsFilter from "../components/ResultsFilter/ResultsFilter";

// Helper method which coverts any string to capital case.
// Used for page header, which is dynamic based on what's searched for.
const capitalize = (string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};

const AdoptablePets = () => {
  const [filter, setFilter] = useState();
  const [filtered, setFiltered] = useState(false);

  const setFilterHandler = (filterValues) => {
    setFilter({ ...filterValues });
    setFiltered(true);
  };

  return (
    <div className="main-content">
      <ResultsFilter setPageFilter={setFilterHandler} />
      <h1>{"Adoptable Pets"}</h1>
      <PetDisplay
        petsFilter={filter}
        filtered={filtered}
        limit={96}
        displayAmount={96}
      />
    </div>
  );
};

export default AdoptablePets;
