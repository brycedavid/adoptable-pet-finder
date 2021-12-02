// About.js
// This page displays information about this website.

import React from "react";
import Footer from "../components/Footer/Footer";

const About = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

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
    <div className="main-content">
      <div className="about-page-content">
        <h1>About the site</h1>
        <p className="about-page-text">
          Adoptable Pet Finder allows you to find adoption centers, as well as
          adoptable pets available for adoption! Looking for a specific pet?
          Breed? Gender? Want to help out a specific organization? No problem,
          Adoptable Pet Finder has you covered! And don't worry; you can filter
          for a specific location as well, so no need to drive across the
          country!
        </p>
        <br />
        <p className="about-page-text">
          Adoptable Pet Finder utilizes the free-to-use Petfinder API for
          developers, sponsored by the company Purina, which aims to help pets
          find homes by providing a way for developers to create sites like
          this. Check them out{" "}
          <span>
            <button
              onClick={petfinderNavigationHandler}
              className="button-inline"
            >
              here!
            </button>
          </span>
        </p>
        <h1>About the author</h1>
        <p className="about-page-text">
          This website was created with the intent of learning React.js for web
          development. However, my love for animals and passion for any animal
          in need has definitely influenced my decision to create this site.
        </p>
        <h1>The future of Adoptable Pet Finder</h1>
        <p className="about-page-text">
          Adoptable Pet Finder will be improved and expanded upon in the future
          with the aim of reaching a larger audience, providing a cutting-edge
          user experience, allowing a wider range of search options, and of
          course, helping more pets!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
