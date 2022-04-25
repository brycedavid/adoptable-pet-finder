// Navbar.js
// This is the navbar that is present on the top of every page.
// It renders Subnavs as children, which allow the user to navigate to different pages.

import React, { useState, useEffect } from "react";
import Subnav from "./Subnav";

const Navbar = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const ref = React.useRef();

  // Track whether or not the viewport width is <= 460. If so, set isMobileViewport to true. If not, set isMobileViewport
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

  if (isMobileViewport) {
    return (
      <div className="navbar--mobile">
        <input
          type="checkbox"
          class="navbar--mobile__checkbox"
          id="navi-toggle"
          ref={ref}
        />
        <label for="navi-toggle" class="navbar--mobile__button">
          <span className="navbar--mobile__icon">&nbsp;</span>
        </label>
        <div className="navbar--mobile__background">&nbsp;</div>
        <div className="navbar--mobile__nav">
          <ul>
            <Subnav page="Home" to="/" mobileVersion={true} checkboxRef={ref} />
            <Subnav
              page="Adoption Centers"
              to="/adoption-centers"
              mobileVersion={true}
              checkboxRef={ref}
            />
            <Subnav
              page="Adoptable Pets"
              to="/adoptable-pets"
              mobileVersion={true}
              checkboxRef={ref}
            />
            <Subnav
              page="About"
              to="/about"
              mobileVersion={true}
              checkboxRef={ref}
            />
          </ul>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar">
      <ul>
        <Subnav page="Home" to="/" mobileVersion={false} />
        <Subnav
          page="Adoption Centers"
          to="/adoption-centers"
          mobileVersion={false}
        />
        <Subnav
          page="Adoptable Pets"
          to="/adoptable-pets"
          mobileVersion={false}
        />
        <Subnav page="About" to="/about" mobileVersion={false} />
      </ul>
    </nav>
  );
};

export default Navbar;
