// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import PetDisplay from "../components/InfoDisplay/PetDisplay";

// Helper method which coverts any string to capital case.
// Used for page header, which is dynamic based on what's searched for.
const capitalize = (string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};

const AdoptablePets = (props) => {
  return (
    <div className="main-content">
      <h1>
        {props.searchData
          ? `Adoptable ${capitalize(props.searchData)}s`
          : "Adoptable Pets"}
      </h1>
      <PetDisplay
        limit={100}
        displayAmount={100}
        searchFor={props.searchData}
      />
    </div>
  );
};

export default AdoptablePets;
