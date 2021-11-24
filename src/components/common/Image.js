// Image.js
// A configurable image component

const Image = (props) => {
  return (
    <img className={`${props.class}`} alt={props.altText} src={props.source} />
  );
};

export default Image;
