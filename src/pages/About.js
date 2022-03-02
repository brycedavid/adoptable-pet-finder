// About.js
// This page displays information about this website.

import React from "react";
import Footer from "../components/Footer/Footer";

import pawprintImg from "../shared/images/pawprint.png";

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
      <div className="main-content__text-container">
        <h1 className="heading--large">About the site</h1>
        <p>
          Adoptable Pet Finder allows you to find adoption centers, as well as
          adoptable pets available for adoption! Looking for a specific pet?
          Breed? Gender? Want to help out a specific organization? No problem,
          Adoptable Pet Finder has you covered! And don't worry; you can filter
          for a specific location as well, so no need to drive across the
          country!
        </p>
        <br />
        <p>
          Adoptable Pet Finder utilizes the free-to-use Petfinder API for
          developers, sponsored by the company Purina, which aims to help pets
          find homes by providing a way for developers to create sites like
          this. Check them out{" "}
          <span>
            <button
              onClick={petfinderNavigationHandler}
              className="btn--inline"
            >
              here!
            </button>
          </span>
        </p>
        <h1 className="heading--large">About the author</h1>
        <p>
          This website was created with the intent of learning React.js for web
          development. However, my love for animals and passion for any animal
          in need has definitely influenced my decision to create this site.
        </p>
        <h1 className="heading--large">The future of Adoptable Pet Finder</h1>
        <p>
          Adoptable Pet Finder will be improved and expanded upon in the future
          with the aim of reaching a larger audience, providing a cutting-edge
          user experience, allowing a wider range of search options, and of
          course, helping more pets!
        </p>
      </div>
      <img className="main-content__pawprint-img" src={pawprintImg} />
      <Footer />
    </div>
  );
};

export default About;
