import ReactDOM from "react-dom";
import { Fragment } from "react";

import Backdrop from "./Backdrop";
import SignupForm from "../Auth/SignupForm";
import LoginForm from "../Auth/LoginForm";

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
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className={"modal"}>{form}</div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalOverlay;