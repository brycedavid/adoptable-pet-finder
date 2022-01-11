import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Footer from "../components/Footer/Footer";

import GoogleMap from "../components/common/GoogleMap";

import dogPlaceholderImg from "../shared/images/dog-placeholder-tall.svg";
import catPlaceholderImg from "../shared/images/cat-placeholder-tall.svg";
import orgPlaceholderImg from "../shared/images/organization_placeholder.jpg";

let bingKey = null;
let mapKey = null;

const DetailedInfo = (props) => {
  const [coordinates, setCoordinates] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

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

  console.log(address);

  let photoElement = null;

  if (props.for === "pets") {
    // Check for a picture associated with the pet. If no picture, insert placeholder image based on pet type.
    if (pictures.length !== 0) {
      photoElement = <img src={pictures[0].full} alt={`${name}`} />;
    } else if (pictures.length === 0 && type === "Dog") {
      photoElement = <img src={dogPlaceholderImg} alt={`${name}`} />;
    } else {
      photoElement = <img src={catPlaceholderImg} alt={`${name}`} />;
    }
  } else {
    if (pictures.length !== 0) {
      photoElement = <img src={pictures[0].full} alt={`${name}`} />;
    } else {
      photoElement = <img src={orgPlaceholderImg} alt={`${name}`} />;
    }
  }

  useEffect(() => {
    const geocode = async () => {
      let url;
      let dbResponseData = null;

      dbResponseData = await fetch(
        "https://stalwart-fx-307719-default-rtdb.firebaseio.com/SuIdkU.json",
        { method: "GET" }
      );

      if (!dbResponseData.ok) {
        throw new Error("Could not retrieve Client key/secret");
      }

      await dbResponseData.json().then((data) => {
        let forbiddenChars = ["?", "&", "=", "."];
        for (let char of forbiddenChars) {
          data.aIendD = data.aIendD.split(char).join("");
        }
        bingKey = data.aIendD;
      });

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

  const showMoreInfoHandler = () => {
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
    toRender = <GoogleMap location={{ ...coordinates }} mapKey={mapKey} />;
    // toRender = <p>Google Map placeholder</p>;
  }

  return (
    <React.Fragment>
      <div className="map-display-container">{toRender}</div>
      <div
        className={
          props.for === "pets"
            ? "content-container-pets"
            : "content-container-organizations"
        }
      >
        <div className="image-container-large">{photoElement}</div>
        <div
          className={
            props.for === "pets"
              ? "info-container-pets"
              : "info-container-organizations"
          }
        >
          <h1>{name}</h1>
          {props.for === "pets" && <p>{`Gender: ${gender}`}</p>}
          {props.for === "pets" && <p>{`Age: ${age}`}</p>}
          {props.for === "pets" && <p>{`Breed: ${breed}`}</p>}
          {props.for === "pets" && <p>{`Size: ${size}`}</p>}
          {props.for === "pets" && <p>{`Spayed/neutered: ${fixed}`}</p>}
          {props.for === "orgs" && <p>{address.address1}</p>}
          {props.for === "orgs" && <p>{phone}</p>}
          {props.for === "orgs" && <p>{email}</p>}
          <button className="button-alt" onClick={showMoreInfoHandler}>
            More info
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DetailedInfo;
