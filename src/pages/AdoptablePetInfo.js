import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import GoogleMap from "../components/common/GoogleMap";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Footer from "../components/Footer/Footer";

import dogPlaceholderImg from "../shared/images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../shared/images/cat-placeholder-tall.svg";

const apiKey = "AIzaSyA8dkZox5rDqof9KlHB-5nzahLvW9oSanQ";
const bingKey =
  "Ap6PrGdAbmMIBP2Fj7uehpwOzeeKjI7IS1YIlisOXARAp7dX3xcskdsqEBsbKTjA";

const AdoptablePetInfo = (props) => {
  const [coordinates, setCoordinates] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const {
    id,
    type,
    address,
    name,
    size,
    fixed,
    age,
    breed,
    gender,
    pictures,
    url,
  } = location.state;
  let lat, long;

  console.log(address);

  let photoElement = null;

  // Check for a picture associated with the pet. If no picture, insert placeholder image based on pet type.
  if (pictures.length !== 0) {
    photoElement = <img src={pictures[0].full} alt={`${name}`} />;
  } else if (pictures.length === 0 && type === "Dog") {
    photoElement = <img src={dogPlaceholderImg} alt={`${name}`} />;
  } else {
    photoElement = <img src={catPlaceholderImg} alt={`${name}`} />;
  }

  useEffect(() => {
    const geocode = async () => {
      let url;

      if (address.address1) {
        url = `http://dev.virtualearth.net/REST/v1/Locations/US/-/${address.postcode}/${address.city}/${address.address1}?key=${bingKey}`;
      } else {
        url = `http://dev.virtualearth.net/REST/v1/Locations/US/-/${address.postcode}/${address.city}/-?key=${bingKey}`;
      }

      const response = await fetch(url);

      console.log(response);

      const data = await response.json();

      let latStr =
        data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0].toString();
      let latitude = Number(latStr.slice(0, 6));

      let lonStr =
        data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1].toString();
      let longitude = Number(lonStr.slice(0, 6));

      lat = latitude;
      long = longitude;

      setCoordinates({ lat, long });
      setIsLoading(false);
    };
    geocode();
  }, [location]);

  const showPetInfoHandler = () => {
    // Opens the URL to the pet information in a new window
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  let toRender;

  if (isLoading) {
    toRender = <LoadingIndicator />;
  } else {
    toRender = <GoogleMap location={{ ...coordinates }} />;
  }

  return (
    <React.Fragment>
      <div className="map-display-container">{toRender}</div>
      <div className="content-container-pets">
        <div className="image-container-large">{photoElement}</div>
        <div className="info-container-pets">
          <h1>{name}</h1>
          <p>{`Gender: ${gender}`}</p>
          <p>{`Age: ${age}`}</p>
          <p>{`Breed: ${breed}`}</p>
          <p>{`Size: ${size}`}</p>
          <p>{`Spayed/neutered: ${fixed}`}</p>
          <button className="button-alt" onClick={showPetInfoHandler}>
            More info
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdoptablePetInfo;
