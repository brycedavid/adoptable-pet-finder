// AdoptionCenters.js
// This page renders adoption center information by rendering the AdoptionCenterDisplay component as a child.
// Implemented for use with React router in App.js.

import React from "react";
import Footer from "../components/Footer/Footer";
import AdoptionCenterDisplay from "../components/InfoDisplay/AdoptionCenterDisplay";

const AdoptionCenters = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <React.Fragment>
      <div className="main-content">
        <h1>Adoption Centers</h1>
        <AdoptionCenterDisplay limit={100} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdoptionCenters;
