import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const apiKey = "AIzaSyA8dkZox5rDqof9KlHB-5nzahLvW9oSanQ";

const GoogleMap = (props) => {
  const mapStyles = {
    width: "100%",
    height: "270px",
  };

  let lat = props.location.lat;
  let long = props.location.long;

  return (
    <div className="map-container">
      <Map
        google={props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: long }}
      >
        <Marker position={{ lat: lat, lng: long }} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({ apiKey })(GoogleMap);
