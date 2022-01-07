import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const apiKey = "AIzaSyA8dkZox5rDqof9KlHB-5nzahLvW9oSanQ";

const GoogleMap = (props) => {
  const mapStyles = {
    width: "270px",
    height: "270px",
  };

  let lat = props.location.lat;
  let long = props.location.long;

  console.log(lat);
  console.log(long);

  return (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{ lat: lat, lng: long }}
    >
      <Marker position={{ lat: lat, lng: long }} />
    </Map>
  );
};

export default GoogleApiWrapper({ apiKey })(GoogleMap);
