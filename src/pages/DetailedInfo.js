import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Footer from "../components/Footer/Footer";
import useFirebase from "../hooks/useFirebase";

import GoogleMap from "../components/common/GoogleMap";

import dogPlaceholderImg from "../shared/images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../shared/images/cat-placeholder-tall.svg";
import orgPlaceholderImg from "../shared/images/organization_placeholder.jpg";

let mapKey = null;
let bingKey = null;

const DetailedInfo = (props) => {
  const [coordinates, setCoordinates] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [requestError, setRequestError] = useState(false);
  const [requestMade, setRequestMade] = useState(false);

  const location = useLocation();

  console.log(location.state);

  let id,
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
    phone,
    email;

  if (props.for === "pets") {
    ({
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
    } = location.state);
  } else {
    ({ name, address, phone, email, url, pictures } = location.state);
  }

  let lat, long;

  let photoElement = null;

  if (props.for === "pets") {
    // Check for a picture associated with the pet. If no picture, insert placeholder image based on pet type.
    if (pictures) {
      if (pictures.length !== 0) {
        photoElement = <img src={pictures[0].full} alt={`${name}`} />;
      } else if (pictures.length === 0 && type === "Dog") {
        photoElement = <img src={dogPlaceholderImg} alt={`${name}`} />;
      } else {
        photoElement = <img src={catPlaceholderImg} alt={`${name}`} />;
      }
    } else {
      if (type === "Dog") {
        photoElement = <img src={dogPlaceholderImg} alt={`${name}`} />;
      } else {
        photoElement = <img src={catPlaceholderImg} alt={`${name}`} />;
      }
    }
  } else {
    if (pictures.length !== 0) {
      photoElement = <img src={pictures[0].full} alt={`${name}`} />;
    } else {
      photoElement = <img src={orgPlaceholderImg} alt={`${name}`} />;
    }
  }

  let key = useFirebase("bing");

  if (bingKey === null) {
    bingKey = key;
  }

  useEffect(() => {
    const geocode = async () => {
      let url;

      if (address.address1) {
        url = `http://dev.virtualearth.net/REST/v1/Locations/US/-/${address.postcode}/${address.city}/${address.address1}?key=${bingKey}`;
        // url = `http://dev.virtualearth.net/REST/v1/Locations/US/-/${address.postcode}/${address.city}/${address.address1}?key=asdf`;
      } else {
        url = `http://dev.virtualearth.net/REST/v1/Locations/US/-/${address.postcode}/${address.city}/-?key=${bingKey}`;
      }

      await fetch(url)
        .then(async (geocodeResponse) => {
          const data = await geocodeResponse.json();

          if (!geocodeResponse.ok) {
            throw new Error("Could not fetch geocode data");
          }

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
          setRequestMade(true);
        })
        .catch((error) => {
          console.log(error.message);
          setRequestError(true);
          setIsLoading(false);
        });
    };
    if (bingKey !== null) {
      geocode();
    }
  }, [location, bingKey]);

  const showMoreInfoHandler = () => {
    // Opens the URL to the pet/org information in a new window
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  let toRender;

  if (requestError || !requestMade) {
    toRender = null;
  } else if (isLoading && !requestError) {
    toRender = (
      <div className="map-display-container">
        <LoadingIndicator />
      </div>
    );
  } else if (!isLoading && !requestError) {
    toRender = (
      <div className="map-display-container">
        <GoogleMap location={{ ...coordinates }} mapKey={mapKey} />
      </div>
    );
  }

  return (
    <React.Fragment>
      {toRender !== null && toRender}
      <div
        className={
          props.for === "pets"
            ? "content-container--pets"
            : "content-container--organizations"
        }
      >
        <div
          className={
            props.for === "pets"
              ? "image-container--large"
              : "image-container--large-org"
          }
        >
          {photoElement}
        </div>
        <div className="detailed-info-container">
          <h1>{name}</h1>
          {props.for === "pets" && <p>{`Gender: ${gender}`}</p>}
          {props.for === "pets" && <p>{`Age: ${age}`}</p>}
          {props.for === "pets" && <p>{`Breed: ${breed}`}</p>}
          {props.for === "pets" && <p>{`Size: ${size}`}</p>}
          {props.for === "pets" && <p>{`Spayed/neutered: ${fixed}`}</p>}
          <br />
          <p>{address.address1}</p>
          <p>{`${address.city}, ${address.state} ${address.postcode}`}</p>
          <br />
          {props.for === "orgs" && <p>{phone}</p>}
          {props.for === "orgs" && <p>{email}</p>}
          <button className="btn--alt btn--large" onClick={showMoreInfoHandler}>
            Petfinder Adoption Page
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DetailedInfo;
