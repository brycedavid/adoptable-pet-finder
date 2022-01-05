// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import isEqual from "react-fast-compare";

import PetDisplayItem from "./PetDisplayItem";
import useApi from "../../hooks/use-api";
import PetFilter from "../ResultsFilter/PetFilter";
import Backdrop from "../common/Backdrop";

const PetDisplayGeneral = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [resultsFilter, setResultsFilter] = useState({
    type: "any",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const petRequestSent = useSelector((state) => state.petRequestSent);
  const homeRequestSent = useSelector((state) => state.homeRequestSent);
  const petData = useSelector((state) => state.petData);
  const homeData = useSelector((state) => state.homeData);

  let sendRequest = true;
  let data = null;

  if (requestError) {
    sendRequest = false;
  }

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
    petRequestSent &&
    !props.featuredPets
  ) {
    sendRequest = false;
  }

  if (props.featuredPets && homeRequestSent) {
    sendRequest = false;
  }

  // Request pet data
  data = useApi({
    limit: props.limit,
    displayAmount: props.displayAmount,
    sendRequest,
    filter: resultsFilter,
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
    petRequestSent &&
    !props.featuredPets
  ) {
    data = petData;
  }

  if (props.featuredPets && homeRequestSent) {
    data = homeData;
  }

  if (data !== null && data !== prevData) {
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

    if (!props.featuredPets) {
      dispatch({ type: "UPDATE_PET_REQUEST_SENT", payload: true });
      dispatch({ type: "UPDATE_PET_DATA", payload: data });
    }

    if (props.featuredPets && !homeRequestSent) {
      dispatch({ type: "UPDATE_HOME_DATA", payload: data });
      dispatch({ type: "UPDATE_HOME_REQUEST_SENT", payload: true });
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
    setResultsFilter({ ...filterValues });
    dispatch({ type: "UPDATE_PET_FILTER", payload: { ...filterValues } });
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
                    index={-2}
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
        {ReactDOM.createPortal(
          <Backdrop class="backdrop-clear" />,
          document.getElementById("backdrop-root")
        )}
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
                index={-2}
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
      {!props.featuredPets && <PetFilter setPageFilter={setFilterHandler} />}
      {toRender}
    </div>
  );
};

export default PetDisplayGeneral;
