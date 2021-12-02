// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

const AdoptablePets = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <React.Fragment>
      <div className="main-content">
        <h1>{"Adoptable Pets"}</h1>
        <p className="subheader">Search for an adoptable pet!</p>
        <PetDisplay limit={96} displayAmount={96} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdoptablePets;
