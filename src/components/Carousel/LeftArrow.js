import leftCarrotImg from "../../shared/images/left_carrot.png";

const LeftArrow = (props) => {
  return (
    <div className="back-arrow" onClick={props.goToPrevSlide}>
      <img src={leftCarrotImg} />
    </div>
  );
};

export default LeftArrow;
