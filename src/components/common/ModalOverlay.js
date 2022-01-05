import ReactDOM from "react-dom";
import { Fragment } from "react";

import Backdrop from "./Backdrop";
import SignupForm from "../Auth/SignupForm";
import LoginForm from "../Auth/LoginForm";
import xImg from "../../shared/images/x.png";

const ModalOverlay = (props) => {
  let form = null;

  if (props.modalType === "login") {
    form = (
      <LoginForm onLogin={props.closeModal} closeModal={props.closeModal} />
    );
  } else if (props.modalType === "signup") {
    form = (
      <SignupForm onSignup={props.closeModal} closeModal={props.closeModal} />
    );
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop class="backdrop" closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className={"modal"}>
          <div className="x-container">
            <img src={xImg} alt="x" onClick={props.closeModal} />
          </div>
          {form}
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalOverlay;
