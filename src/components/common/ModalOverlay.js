import ReactDOM from "react-dom";
import { Fragment } from "react";

import Backdrop from "./Backdrop";
import AuthForm from "../Auth/AuthForm";
import xImg from "../../shared/images/x.png";

const ModalOverlay = (props) => {

  const closeModalHandler = () => {
    props.closeModal();
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop className="backdrop" closeModal={closeModalHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className="modal-container">
          <div className="modal">
            <div className="modal__x-container">
              <img src={xImg} alt="x" onClick={closeModalHandler} />
            </div>
            <AuthForm type={props.modalType} onSubmit={props.closeModal} closeModal={props.closeModal} />
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalOverlay;
