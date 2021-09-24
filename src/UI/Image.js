import "./Image.css";

const Image = (props) => {
  return (
    <div className="image-container">
      <img alt={props.altText} src={props.source} />
    </div>
  );
};

export default Image;
