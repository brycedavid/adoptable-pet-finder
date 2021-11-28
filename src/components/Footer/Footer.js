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
        <p>Made possible by: </p>
        <a
          className="footer-image-container"
          onClick={petfinderNavigationHandler}
        >
          <img src={purinaLogo} />
          <img src={petfinderLogo} />
        </a>
      </section>
      <section className="links-section">
        <a onClick={scrollToTopHandler}>Top of page</a>
      </section>
    </div>
  );
};

export default Footer;
