// LoginModal.js
// This file consists of three components: the LoginModal, which is rendered upon user login, and the
// ModalOverlay and Backdrop, which are children of the LoginModal. A portal is used
// to render the modal overlay on the root component.
// The Backdrop prevents the user from interacting with the page and creates an overlay effect.
// The ModalOverlay renders the login form as a child.

import ReactDOM from "react-dom";

import classes from "./LoginModal.module.css";

import LoginForm from "./LoginForm";
import Card from "../UI/Card";
import { Fragment } from "react";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal} />;
};

const ModalOverlay = (props) => {
  return (
    <Card class="modal-overlay">
      <LoginForm onLogin={props.closeModal} />
    </Card>
  );
};

const LoginModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay closeModal={props.closeModal} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default LoginModal;
