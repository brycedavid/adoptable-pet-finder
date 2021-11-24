// Card.js
// A reusable card component, which acts as a configurable container to display information.

const Card = (props) => {
  return <div className={`${props.class}`}>{props.children}</div>;
};

export default Card;
