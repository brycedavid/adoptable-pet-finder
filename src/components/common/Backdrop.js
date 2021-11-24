const Backdrop = (props) => {
  return (
    <div
      className="backdrop"
      onClick={props.closeModal ? props.closeModal : null}
    />
  );
};

export default Backdrop;
