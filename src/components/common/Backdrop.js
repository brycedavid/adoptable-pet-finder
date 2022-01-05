const Backdrop = (props) => {
  return (
    <div
      className={props.class}
      onClick={props.closeModal ? props.closeModal : null}
    />
  );
};

export default Backdrop;
