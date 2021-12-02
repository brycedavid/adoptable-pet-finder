import rightCarrotImg from "../../shared/images/right_carrot.png";

const RightArrow = (props) => {
  return (
    <div className="forward-arrow" onClick={props.goToNextSlide}>
      <img src={rightCarrotImg} />
    </div>
  );
};

export default RightArrow;
