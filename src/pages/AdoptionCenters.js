import { Fragment } from "react";

import AdoptionCenterDisplay from "../components/InfoDisplay/AdoptionCenterDisplay";

const AdoptionCenters = (props) => {
  return (
    <Fragment>
      <h1>Adoption Centers</h1>
      <AdoptionCenterDisplay client={props.client} />
    </Fragment>
  );
};

export default AdoptionCenters;
