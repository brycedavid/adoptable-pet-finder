// AdoptionCenters.js
// This page renders adoption center information by rendering the AdoptionCenterDisplay component as a child.
// Implemented for use with React router in App.js.

import classes from "./AdoptionCenters.module.css";

import AdoptionCenterDisplay from "../components/InfoDisplay/AdoptionCenterDisplay";

const AdoptionCenters = (props) => {
  return (
    <div className={classes["adoption-centers-main-content"]}>
      <h1>Adoption Centers</h1>
      <AdoptionCenterDisplay limit={100} />
    </div>
  );
};

export default AdoptionCenters;