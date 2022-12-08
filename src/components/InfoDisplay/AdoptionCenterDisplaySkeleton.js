import React from "react";
import ReactDOM from "react-dom";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import Backdrop from "../common/Backdrop";

const AdoptionCenterDisplaySkeleton = () => {
  const skeletonArray = [0];

  return (
    <div className="org-display-item-container">
        {ReactDOM.createPortal(
          <Backdrop class="backdrop-clear" />,
          document.getElementById("backdrop-root")
        )}
        <div className="org-display-container__content">
          {skeletonArray.map(() => (
            <AdoptionCenterDisplayItem
              email="..."
              key={Math.random() * 1000}
              id="..."
              address={{
                address1: "...",
                city: "...",
                state: "...",
                postcode: "...",
              }}
              name="..."
              phone="..."
              pictures={[]}
              url={"..."}
              animalsLink={"..."}
              skeleton={true}
            />
          ))}
        </div>
        <div className="wave-loader-container">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="btn-container-bottom">
          <button className="btn--alt btn--large disabled">Show More</button>
          <button className="btn--main btn--large disabled">
            Browse Adoptable Pets
          </button>
        </div>
      </div>
  );
}

export default AdoptionCenterDisplaySkeleton;