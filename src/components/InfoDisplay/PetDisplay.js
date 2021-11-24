// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import isEqual from "react-fast-compare";

import classes from "./PetDisplay.module.css";

import PetDisplayItem from "./PetDisplayItem";
import useApi from "../../hooks/use-api";
import LoadingIndicator from "../UI/LoadingIndicator";
import ResultsFilter from "../ResultsFilter/ResultsFilter";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [resultsFilter, setResultsFilter] = useState(null);
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [homeFilter, setHomeFilter] = useState(null);

  // Determines whether or not we should send a request
  let sendRequest = true;
  let data = null;

  if (requestError) {
    sendRequest = false;
  }

  if (props.homeSearchFor !== null && homeFilter !== props.homeSearchFor) {
    setHomeFilter(props.homeSearchFor);
    console.log(props.homeSearchFor);
    console.log(
      "Received data from home search form; setting Home Filter to: "
    );
    console.log(resultsFilter);
  }

  if (resultsFilter && homeFilter && !isEqual(resultsFilter, homeFilter)) {
    setFilter(resultsFilter);
    setIsLoading(true);
    setParsedData(null);
    setRequestError(null);
    setHomeFilter(null);
  }

  if (
    resultsFilter &&
    !isEqual(resultsFilter, filter) &&
    resultsFilter === null &&
    parsedData.hasOwnProperty(data)
  ) {
    setPrevData(parsedData.data);
    console.log("Filters in PetDisplay not equal. Setting filter to: ");
    console.log(resultsFilter);
    setFilter(resultsFilter);
    setIsLoading(true);
    setParsedData(null);
    setRequestError(null);
    setHomeFilter(null);
  }

  const history = useHistory();

  const requestErrorHandler = (error) => {
    setRequestError(error);
  };

  // Request pet data
  data = useApi({
    limit: props.limit,
    displayAmount: props.displayAmount,
    sendRequest,
    filter: homeFilter ? homeFilter : resultsFilter,
    onRequestError: requestErrorHandler,
  });

  if (data !== null && data !== prevData) {
    // If isLoading is true and some data was received, setParsedData and set isLoading to false.
    let showButton = true;

    if (data.length <= 12) {
      showButton = false;
    }
    if (props.featuredPets) {
      showButton = false;
    }

    setIsLoading(false);
    setPrevData(data);
    setParsedData({
      data,
      itemsToShow: 12,
      showButton,
    });
  }

  const showMoreHandler = () => {
    let { data: prevData, itemsToShow: prevItemsToShow } = parsedData;
    let showButton = true;

    if (
      prevItemsToShow + 12 === 96 ||
      prevData.length <= prevItemsToShow + 12
    ) {
      showButton = false;
    }

    setParsedData({
      data: prevData,
      itemsToShow: prevItemsToShow + 12,
      showButton,
    });
  };

  const setFilterHandler = (filterValues) => {
    setResultsFilter({ ...filterValues });
    props.setHomeSearchFor(null);
    props.setHomeData(null);
    setHomeFilter(null);
  };

  const browseOrganizationsHandler = () => {
    history.push("/adoption-centers");
  };

  let toRender;

  if (!isLoading && data !== null) {
    toRender = (
      <React.Fragment>
        <div className="display-item-container">
          <div className={classes["pet-display-container"]}>
            {parsedData.data.length > 0 ? (
              parsedData.data
                .slice(0, parsedData.itemsToShow)
                .map((animal) => (
                  <PetDisplayItem
                    key={animal.key}
                    name={animal.name}
                    age={animal.age}
                    fixed={animal.fixed}
                    pictures={animal.pictures}
                    url={animal.url}
                    type={animal.type}
                    breed={animal.breed}
                    size={animal.size}
                    gender={animal.gender}
                  />
                ))
            ) : (
              <div>No pets found.</div>
            )}
          </div>
          <div className="footer-container">
            {parsedData.showButton && (
              <button
                className="button-alt button-display-item"
                onClick={showMoreHandler}
              >
                Show More Pets
              </button>
            )}
            {history.location.pathname === "/adoptable-pets" && (
              <button
                className="button-main button-display-item"
                onClick={browseOrganizationsHandler}
              >
                Browse Adoption Centers
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  } else if (requestError) {
    toRender = (
      <h1>
        Something went wrong with your request. Please check your search values
        and try again.
      </h1>
    );
  } else {
    toRender = (
      <div className="loading-indicator-container">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="display-page-container">
        {!props.featuredPets && (
          <ResultsFilter
            isLoading={isLoading}
            setPageFilter={setFilterHandler}
            homeFilter={homeFilter}
          />
        )}
        {toRender}
      </div>
    </React.Fragment>
  );
};

export default PetDisplay;
