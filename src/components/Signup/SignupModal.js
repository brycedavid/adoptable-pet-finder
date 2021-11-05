import ReactDOM from "react-dom";
import { Fragment } from "react";

import SignupForm from "./SignupForm";
import Backdrop from "../UI/Backdrop";
import ModalOverlay from "../UI/ModalOverlay";

const SignupModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay class="login-modal" closeModal={props.closeModal}>
          <LoginForm onLogin={props.closeModal} />
        </ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default SignupModal;
