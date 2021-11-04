// LoginModal.js
// This file consists of three components: the LoginModal, which is rendered upon user login, and the
// ModalOverlay and Backdrop, which are children of the LoginModal. A portal is used
// to render the modal overlay on the root component.
// The Backdrop prevents the user from interacting with the page and creates an overlay effect.
// The ModalOverlay renders the login form as a child.

import ReactDOM from "react-dom";
import { Fragment } from "react";

import classes from "./LoginModal.module.css";

import LoginForm from "./LoginForm";
import Card from "../UI/Card";
import Backdrop from "../UI/Backdrop";
import ModalOverlay from "../UI/ModalOverlay";

const LoginModal = (props) => {
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

export default LoginModal;
