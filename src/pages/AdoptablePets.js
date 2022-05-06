// AdoptablePets.js
// This page displays pet information by rendering the PetDisplay component as a child.
// Implemented for use with React router in App.js.

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

const AdoptablePets = () => {
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
            <h1 className="heading--large">Adoptable Pets</h1>
            <h2 className="heading--medium">Search for an adoptable pet!</h2>
            <PetDisplay limit={96} displayAmount={96} />
          </React.Fragment>
        )}
        {isMobileViewport && (
          <React.Fragment>
            <PetDisplay limit={96} displayAmount={96} />
          </React.Fragment>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdoptablePets;
