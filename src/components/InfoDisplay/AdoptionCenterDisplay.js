// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import React, { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import isEqual from "react-fast-compare";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";
import OrganizationFilter from "../ResultsFilter/OrganizationFilter";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [resultsFilter, setResultsFilter] = useState({ location: "any" });
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const orgRequestSent = useSelector((state) => state.orgRequestSent);
  const orgData = useSelector((state) => state.orgData);

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
    dispatch({ type: "UPDATE_ORG_FILTER", payload: { ...filterValues } });
    setIsLoading(true);
  };

  let toRender;

  if (!isLoading && parsedData !== null) {
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
    toRender = (
      <React.Fragment>
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
    <div className="display-container-organization-page">
      <OrganizationFilter setPageFilter={setFilterHandler} />
      {toRender}
    </div>
  );
};

export default AdoptionCenterDisplay;
