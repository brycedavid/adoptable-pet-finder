// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import { useState } from "react";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

// Helper method which coverts any string to capital case.
// Used for page header, which is dynamic based on what's searched for.
const capitalize = (string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};

const AdoptablePets = (props) => {
  const [homeSearchFor, setHomeSearchFor] = useState(null);

  window.scrollTo({ top: 0, behavior: "instant" });

  if (props.searchData && homeSearchFor === null) {
    setHomeSearchFor(props.searchData);
  }

  const setHomeSearchForHandler = (value) => {
    setHomeSearchFor(value);
  };

  return (
    <div className="main-content">
      <h1>{"Adoptable Pets"}</h1>
      <PetDisplay
        homeSearchFor={homeSearchFor}
        limit={96}
        displayAmount={96}
        setHomeSearchFor={setHomeSearchForHandler}
        setHomeData={props.setSearchData}
      />
    </div>
  );
};

export default AdoptablePets;
