// About.js
// This page displays information about this website.

import React from "react";
import Footer from "../components/Footer/Footer";

const About = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <React.Fragment>
      <h1>About</h1>
      <br />
      <p>
        This website was created with the intent of learning React.js for web
        development. However, my love for animals and{" "}
      </p>
      <Footer />
    </React.Fragment>
  );
};

export default About;
