import Card from "./Card";

const ModalOverlay = (props) => {
  return <Card class={props.class}>{props.children}</Card>;
};

export default ModalOverlay;
