const AdoptionCenterDisplayItem = (props) => {
  return (
    <div>
      <a href={props.url} target="_blank" rel="noreferrer noopener">
        {props.name}
      </a>
      <p>{props.phone}</p>
      <p>{props.address.address1}</p>
      <p>{`${props.address.city}, ${props.address.state} ${props.address.postcode}`}</p>
    </div>
  );
};

export default AdoptionCenterDisplayItem;
