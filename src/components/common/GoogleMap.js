import { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import isEqual from "react-fast-compare";

const apiKey = "AIzaSyA8dkZox5rDqof9KlHB-5nzahLvW9oSanQ";

const GoogleMap = (props) => {
  console.log("map re-render");
  const mapStyles = {
    width: "270px",
    height: "270px",
  };

  console.log("Markers:");
  console.log(props.markers);

  let lat = props.location.lat;
  let long = props.location.long;

  console.log(lat);
  console.log(long);

  const displayMarkers = () => {
    console.log(props.markers);
    return props.markers.map((marker, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      );
    });
  };

  return (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={{ lat: lat, lng: long }}
    >
      {displayMarkers()}
    </Map>
  );
};

export default GoogleApiWrapper({ apiKey })(GoogleMap);
