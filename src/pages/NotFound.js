// NotFound.js
// This is our not found page, which catches all invalid routes (in App.js).

import React from "react";
import Footer from "../components/Footer/Footer";

import pawprintImg from "../shared/images/pawprint.png";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="not-found-content">
        <img className="pawprint" src={pawprintImg} />
        <h1>Oops, it seems the page you are looking for does not exist!</h1>
        <h2>
          Use the navbar or the links below to navigate to an existing page
        </h2>
        <br />
        <div>
          <a href="/">Homepage</a>
          <a href="/adoption-centers">Adoption Centers</a>
          <a href="/adoptable-pets">Adoptable Pets</a>
          <a href="/about">About</a>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
