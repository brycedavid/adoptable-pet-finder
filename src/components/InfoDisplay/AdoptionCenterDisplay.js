// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import isEqual from "react-fast-compare";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";
import OrganizationFilter from "../ResultsFilter/OrganizationFilter";
import Backdrop from "../common/Backdrop";
import GoogleMap from "../common/GoogleMap";

const apiKey = "AIzaSyA8dkZox5rDqof9KlHB-5nzahLvW9oSanQ";
const bingKey =
  "Ap6PrGdAbmMIBP2Fj7uehpwOzeeKjI7IS1YIlisOXARAp7dX3xcskdsqEBsbKTjA";

// let lat = 0;
// let long = 0;
let lat = 30.1716722;
let long = -92.06161780000001;

const AdoptionCenterDisplay = (props) => {
  const orgRequestSent = useSelector((state) => state.orgRequestSent);
  const orgData = useSelector((state) => state.orgData);

  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [resultsFilter, setResultsFilter] = useState({ location: "any" });
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  // Determines whether or not we should send a request
  let sendRequest = true;
  let data = null;

  if (requestError) {
    sendRequest = false;
  }

  const requestErrorHandler = useCallback((error) => {
    setRequestError(error);
  }, []);

  if (isEqual(resultsFilter, { location: "any" }) && orgRequestSent) {
    sendRequest = false;
  }

  // Request organization data
  data = useApi({
    searchType: "organizations",
    limit: props.limit,
    type: null,
    filter: resultsFilter,
    sendRequest,
    displayAmount: 180,
    onRequestError: requestErrorHandler,
  });

  if (isEqual(resultsFilter, { location: "any" }) && orgRequestSent) {
    data = orgData;
  }

  // If isLoading is true and some data was received, setParsedData and set isLoading to false.
  if (data !== null && data !== prevData) {
    let showButton = true;

    if (data.length <= 15) {
      showButton = false;
    }

    setIsLoading(false);
    setPrevData(data);
    setParsedData({ data, itemsToShow: 15, showButton });

    dispatch({ type: "UPDATE_ORG_REQUEST_SENT", payload: true });
    dispatch({ type: "UPDATE_ORG_DATA", payload: data });
  }

  const showMoreHandler = () => {
    let { data: prevData, itemsToShow: prevItemsToShow } = parsedData;
    let showButton = true;

    if (
      prevItemsToShow + 15 === 180 ||
      prevData.length <= prevItemsToShow + 15
    ) {
      showButton = false;
    }

    setParsedData({
      data: prevData,
      itemsToShow: prevItemsToShow + 15,
      showButton,
    });
  };

  const browsePetsHandler = () => {
    history.push("/adoptable-pets");
  };

  const setFilterHandler = (filterValues) => {
    setResultsFilter({ ...filterValues });
    setIsLoading(true);
  };

  useEffect(() => {
    const geocode = async () => {
      let address;
      if (resultsFilter.location !== "any") {
        address = resultsFilter.location;
      } else {
        address = "70503";
      }

      const response = await fetch(
        `http://dev.virtualearth.net/REST/v1/Locations/US/-/${address}/-/-?key=${bingKey}`
      );

      const data = await response.json();

      lat = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
      long = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
    };
    geocode();
  }, [resultsFilter]);

  const markOnMap = (orgInfo) => {
    const geocode = async () => {
      let coordinates = markerCoordinates;

      const response = await fetch(
        `http://dev.virtualearth.net/REST/v1/Locations/US/-/${orgInfo.postcode}/${orgInfo.city}/${orgInfo.streetAddress}?key=${bingKey}`
      );

      const data = await response.json();

      let latStr =
        data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0].toString();
      let latitude = Number(latStr.slice(0, 6));

      let lonStr =
        data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1].toString();
      let longitude = Number(lonStr.slice(0, 6));

      coordinates.push({
        lat: latitude,
        lng: longitude,
      });

      console.log(markerCoordinates);

      setMarkerCoordinates([...coordinates]);
    };

    geocode();
  };

  // useEffect(() => {
  //   const geocode = async () => {
  //     let coordinates = [];

  //     for (let i = 0; i < addresses.length; i++) {
  //       const response = await fetch(
  //         `http://dev.virtualearth.net/REST/v1/Locations/US/-/${addresses[i].postcode}/${addresses[i].city}/${addresses[i].address1}?key=${bingKey}`
  //       );

  //       const data = await response.json();

  //       coordinates.push({
  //         lat: data.resourceSets[0].resources[0].geocodePoints[0]
  //           .coordinates[0],
  //         lng: data.resourceSets[0].resources[0].geocodePoints[0]
  //           .coordinates[1],
  //       });
  //     }

  //     console.log(coordinates);
  //   };

  //   geocode();
  // }, [addresses]);

  let toRender;
  let renderedMap;

  if (!isLoading && parsedData !== null) {
    renderedMap = (
      <GoogleMap location={{ lat, long }} markers={markerCoordinates} />
    );
    toRender = (
      <Fragment>
        <div className="display-container">
          <div className="display-container-organization">
            {parsedData.data.length > 0 ? (
              parsedData.data
                .slice(0, parsedData.itemsToShow)
                .map((organization) => (
                  <AdoptionCenterDisplayItem
                    email={organization.email}
                    key={organization.key}
                    id={organization.id}
                    address={organization.address}
                    name={organization.name}
                    phone={organization.phone}
                    pictures={organization.pictures}
                    url={organization.url}
                    animalsLink={organization.animalsLink}
                    markOnMap={markOnMap}
                  />
                ))
            ) : (
              <div className="no-data-message-container">
                <p>No adoption centers found.</p>
              </div>
            )}
          </div>
          <div className="button-container-bottom">
            {parsedData.showButton && (
              <button
                className="button-alt button-display-item"
                onClick={showMoreHandler}
              >
                Show More
              </button>
            )}
            <button
              className="button-main button-display-item"
              onClick={browsePetsHandler}
            >
              Browse Adoptable Pets
            </button>
          </div>
        </div>
      </Fragment>
    );
  } else if (requestError) {
    toRender = (
      <div className="no-data-message-container">
        <p>
          Something went wrong with your request. Please check your search
          values and try again.
        </p>
      </div>
    );
  } else {
    const skeletonArray = [0];
    renderedMap = <div>Loading...</div>;
    toRender = (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Backdrop class="backdrop-clear" />,
          document.getElementById("backdrop-root")
        )}
        <div className="display-container">
          <div className="display-container-organization-skeleton">
            {skeletonArray.map(() => (
              <AdoptionCenterDisplayItem
                email="..."
                key={Math.random() * 1000}
                id="..."
                address={{
                  address1: "...",
                  city: "...",
                  state: "...",
                  postcode: "...",
                }}
                name="..."
                phone="..."
                pictures={[]}
                url={"..."}
                animalsLink={"..."}
                skeleton={true}
              />
            ))}
          </div>
          <div className="wave-loader-container">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="button-container-bottom">
            <button className="button-alt button-display-item disabled">
              Show More
            </button>
            <button className="button-main button-display-item disabled">
              Browse Adoptable Pets
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="display-container-organization-page">
        <div className="left-display sticky">
          <OrganizationFilter setPageFilter={setFilterHandler} />
          {/* <div className="map-display-container">{renderedMap}</div> */}
        </div>
        {toRender}
      </div>
    </React.Fragment>
  );
};

export default AdoptionCenterDisplay;
