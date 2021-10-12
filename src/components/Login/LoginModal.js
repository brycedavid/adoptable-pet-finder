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
