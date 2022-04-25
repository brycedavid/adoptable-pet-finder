// AdoptionCenters.js
// This page renders adoption center information by rendering the AdoptionCenterDisplay component as a child.
// Implemented for use with React router in App.js.

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import AdoptionCenterDisplay from "../components/InfoDisplay/AdoptionCenterDisplay";

const AdoptionCenters = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  window.scrollTo({ top: 0, behavior: "instant" });

  // Track whether or not the viewport width is <= 550. If so, set isMobileViewport to true. If not, set isMobileViewport
  // to false.
  useEffect(() => {
    if (window.innerWidth <= 550) {
      setIsMobileViewport(true);
    } else {
      setIsMobileViewport(false);
    }

    const updateMedia = () => {
      if (window.innerWidth <= 550) {
        setIsMobileViewport(true);
      } else {
        setIsMobileViewport(false);
      }
    };

    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <React.Fragment>
      <div className="main-content">
        {!isMobileViewport && (
          <React.Fragment>
            <h1 className="heading--large">Adoption Centers</h1>
            <h2 className="heading--medium">
              Search for an adoption center near you!
            </h2>
            <AdoptionCenterDisplay limit={100} />
          </React.Fragment>
        )}
        {isMobileViewport && <AdoptionCenterDisplay limit={100} />}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdoptionCenters;
