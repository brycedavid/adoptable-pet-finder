// NotFound.js
// This is our not found page, which catches all invalid routes (in App.js).

import React from "react";
import Footer from "../components/Footer/Footer";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="not-found-content">
        <h1 className="not-found-text">The page was not found</h1>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
