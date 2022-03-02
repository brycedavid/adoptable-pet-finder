// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import React from "react";
import Footer from "../components/Footer/Footer";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

const AdoptablePets = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <React.Fragment>
      <div className="main-content">
        <h1 className="heading--large">Adoptable Pets</h1>
        <h2 className="heading--medium">Search for an adoptable pet!</h2>
        <PetDisplay limit={96} displayAmount={96} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdoptablePets;
