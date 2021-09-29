import { Fragment } from "react";

import Button from "../UI/Button";

const Subnav = (props) => {
  return (
    <Fragment>
      <Button class={"subnav"} text={props.page} />
    </Fragment>
  );
};

export default Subnav;
