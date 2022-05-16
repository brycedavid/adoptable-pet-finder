import ReactDOM from "react-dom";
import { Fragment, useState } from "react";

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

  const closeModalHandler = () => {
    props.closeModal();
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop class="backdrop" closeModal={closeModalHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className="modal-container">
          <div className="modal">
            <div className="modal__x-container">
              <img src={xImg} alt="x" onClick={closeModalHandler} />
            </div>
            {form}
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalOverlay;
