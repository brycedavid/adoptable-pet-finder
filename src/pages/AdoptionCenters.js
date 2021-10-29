import classes from "./AdoptionCenters.module.css";

import AdoptionCenterDisplay from "../components/InfoDisplay/AdoptionCenterDisplay";

const AdoptionCenters = (props) => {
  return (
    <div className={classes["main-content"]}>
      <h1>Adoption Centers</h1>
      <AdoptionCenterDisplay limit={100} />
    </div>
  );
};

export default AdoptionCenters;
