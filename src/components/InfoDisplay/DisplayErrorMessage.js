const DisplayErrorMessage = (props) => {
  return (  
    <div className="no-data-message-container">
      <p>
        {props.message}
      </p>
    </div>
  );
}

export default DisplayErrorMessage;