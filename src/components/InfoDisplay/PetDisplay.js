// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import isEqual from "react-fast-compare";

import PetDisplayItem from "./PetDisplayItem";
import useApi from "../../hooks/use-api";
import ResultsFilter from "../ResultsFilter/ResultsFilter";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [resultsFilter, setResultsFilter] = useState({
    type: "any",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [homeFilter, setHomeFilter] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const petRequestSent = useSelector((state) => state.petRequestSent);
  const petData = useSelector((state) => state.petData);

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

  // if (
  //   resultsFilter &&
  //   !isEqual(resultsFilter, filter) &&
  //   resultsFilter === null &&
  //   parsedData.hasOwnProperty(data)
  // ) {
  //   setPrevData(parsedData.data);
  //   console.log("Filters in PetDisplay not equal. Setting filter to: ");
  //   console.log(resultsFilter);
  //   setFilter(resultsFilter);
  //   setIsLoading(true);
  //   setParsedData(null);
  //   setRequestError(null);
  //   setHomeFilter(null);
  // }

  const requestErrorHandler = useCallback((error) => {
    setRequestError(error);
  }, []);

  if (
    isEqual(resultsFilter, {
      type: "any",
      breed: "any",
      gender: "any",
      age: "any",
      location: "any",
    }) &&
    petRequestSent
  ) {
    sendRequest = false;
  }

  // Request pet data
  data = useApi({
    limit: props.limit,
    displayAmount: props.displayAmount,
    sendRequest,
    filter: homeFilter ? homeFilter : resultsFilter,
    onRequestError: requestErrorHandler,
  });

  if (
    isEqual(resultsFilter, {
      type: "any",
      breed: "any",
      gender: "any",
      age: "any",
      location: "any",
    }) &&
    petRequestSent
  ) {
    data = petData;
  }

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

    if (
      isEqual(resultsFilter, {
        type: "any",
        breed: "any",
        gender: "any",
        age: "any",
        location: "any",
      })
    ) {
      dispatch({ type: "updatePetRequestSent", payload: true });
      dispatch({ type: "updatePetData", payload: data });
    }
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
    console.log("Setting PetDisplay resultsFilter to: ");
    console.log({ ...filterValues });
    setResultsFilter({ ...filterValues });
    props.setHomeSearchFor(null);
    props.setHomeData(null);
    setHomeFilter(null);
    dispatch({ type: "updatePetRequestSent", payload: false });
  };

  const browseOrganizationsHandler = () => {
    history.push("/adoption-centers");
  };

  let toRender;

  if (!isLoading && data !== null) {
    toRender = (
      <React.Fragment>
        <div className="display-container">
          <div className="display-container-pet">
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
              <div className="no-data-message-container">
                <p>No pets found.</p>
              </div>
            )}
          </div>
          <div className="button-container-bottom">
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
      <div className="no-data-message-container">
        <p>
          Something went wrong with your request. Please check your search
          values and try again.
        </p>
      </div>
    );
  } else {
    let skeletonArray = [];

    if (history.location.pathname === "/adoptable-pets") {
      skeletonArray = [0, 0, 0];
    } else {
      skeletonArray = [0, 0, 0, 0, 0, 0, 0, 0];
    }

    toRender = (
      <React.Fragment>
        <div className="display-container">
          <div
            className={
              props.featuredPets
                ? "display-container-pet"
                : "display-container-pet-skeleton"
            }
          >
            {skeletonArray.map(() => (
              <PetDisplayItem
                key={Math.random() * 1000}
                name="..."
                age="..."
                fixed="..."
                pictures={[]}
                url="..."
                type="..."
                breed="..."
                size="..."
                gender="..."
                skeleton={true}
              />
            ))}
          </div>
          {!props.featuredPets && (
            <div className="wave-loader-container">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          <div className="button-container-bottom">
            {history.location.pathname === "/adoptable-pets" && (
              <button
                className="button-alt button-display-item disabled"
                onClick={showMoreHandler}
              >
                Show More Pets
              </button>
            )}
            {history.location.pathname === "/adoptable-pets" && (
              <button
                className="button-main button-display-item disabled"
                onClick={browseOrganizationsHandler}
              >
                Browse Adoption Centers
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="display-container-pet-page">
      {!props.featuredPets && (
        <ResultsFilter
          isLoading={isLoading}
          setPageFilter={setFilterHandler}
          homeFilter={homeFilter}
          for="petDisplay"
        />
      )}
      {toRender}
    </div>
  );
};

export default PetDisplay;
