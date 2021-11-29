// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import React, { Fragment, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";
import ResultsFilter from "../ResultsFilter/ResultsFilter";
import isEqual from "react-fast-compare";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [resultsFilter, setResultsFilter] = useState(null);
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  const history = useHistory();

  // Determines whether or not we should send a request
  let sendRequest = true;
  let data = null;

  if (requestError) {
    sendRequest = false;
  }

  if (
    resultsFilter &&
    !isEqual(resultsFilter, filter) &&
    parsedData.hasOwnProperty(data)
  ) {
    setPrevData(parsedData.data);
    console.log(
      "Filters in AdoptionDisplay are not equal. Setting filter to: "
    );
    console.log(resultsFilter);
    setFilter(resultsFilter);
    setIsLoading(true);
    setParsedData(null);
    setRequestError(null);
  }

  const requestErrorHandler = useCallback((error) => {
    setRequestError(error);
  }, []);

  console.log("About to make request with: ");
  console.log(resultsFilter);

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

  // If isLoading is true and some data was received, setParsedData and set isLoading to false.
  if (data !== null && data !== prevData) {
    let showButton = true;

    if (data.length <= 15) {
      showButton = false;
    }

    console.log("Setting parsedData to: ");
    console.log(data);
    setIsLoading(false);
    setPrevData(data);
    setParsedData({ data, itemsToShow: 15, showButton });
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
    console.log("Setting AdoptDisplay resultsFilter to: ");
    console.log({ ...filterValues });
    setResultsFilter({ ...filterValues });
    setIsLoading(true);
  };

  let toRender;

  if (!isLoading && parsedData !== null) {
    toRender = (
      <Fragment>
        <div className="display-container">
          <div className="display-container-organization">
            {parsedData.data
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
              ))}
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
      <h1>
        Something went wrong with your request. Please check your search values
        and try again.
      </h1>
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
                address="..."
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
      <ResultsFilter
        isLoading={isLoading}
        setPageFilter={setFilterHandler}
        for="organizationDisplay"
      />
      {toRender}
    </div>
  );
};

export default AdoptionCenterDisplay;
