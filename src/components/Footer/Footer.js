import React from "react";

import petfinderLogo from "../../shared/images/petfinder_logo.png";
import purinaLogo from "../../shared/images/purina_logo.jpg";

const Footer = () => {
  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const petfinderNavigationHandler = () => {
    const newWindow = window.open(
      "https://www.petfinder.com/developers/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className="footer-container">
      <section className="sponsor-info">
        <p>Powered by: </p>
        <button
          className="footer-image-container"
          onClick={petfinderNavigationHandler}
          data-testid="petfinder-link"
        >
          <img src={purinaLogo} alt="Purina logo" />
          <img src={petfinderLogo} alt="Petfinder logo" />
        </button>
      </section>
      <section className="links-section">
        <button onClick={scrollToTopHandler}>Top of page</button>
      </section>
    </div>
  );
};

export default Footer;
