import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import PetDisplayItem from "./PetDisplayItem";
import Backdrop from "../common/Backdrop";

const PetDisplaySkeleton = (props) => {
  let isMobileViewport;
  let isSmallDesktopViewport;

  const history = useHistory();

  if (window.innerWidth <= 1060 && window.innerWidth > 550) {
    isSmallDesktopViewport = true;
  }

  if (window.innerWidth <= 550) {
    isMobileViewport = true;
  }

  let skeletonArray = [];

  // Determine how to display skeleton based on viewport size & page
  if (history.location.pathname === "/adoptable-pets") {
    if (isSmallDesktopViewport) {
      skeletonArray = [0, 0];
    } else if (isMobileViewport) {
      skeletonArray = [0];
    } else {
      skeletonArray = [0, 0, 0];
    }
  } else {
    skeletonArray = [0, 0, 0, 0, 0, 0];
  }

  return (
    <div className="pet-display-item-container--skeleton">
      {ReactDOM.createPortal(
        <Backdrop className="backdrop-clear" />,
        document.getElementById("backdrop-root")
      )}
      <div
        className={
          !props.featuredPets
            ? "pet-display-container__content"
            : "pet-display-container--featured__content"
        }
      >
        {skeletonArray.map(() => (
          <PetDisplayItem
            key={Math.random() * 1000}
            name="..."
            age="..."
            fixed="..."
            pictures={[]}
            url="..."
            type="..."
            breed="..."
            size="..."
            gender="..."
            skeleton={true}
            index={-2}
          />
        ))}
      </div>
      {!props.featuredPets && (
        <div className="wave-loader-container">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
      <div className="btn-container-bottom">
        {history.location.pathname === "/adoptable-pets" && (
          <button
            className="btn--alt btn--large disabled"
            onClick={props.showMoreHandler}
          >
            Show More Pets
          </button>
        )}
        {history.location.pathname === "/adoptable-pets" && (
          <button
            className="btn--main btn--large disabled"
            onClick={props.browseOrganizationsHandler}
          >
            Browse Adoption Centers
          </button>
        )}
      </div>
    </div>
  );
};

export default PetDisplaySkeleton;
