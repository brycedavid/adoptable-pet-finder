// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import isEqual from "react-fast-compare";

import PetDisplayItem from "./PetDisplayItem";
import usePetfinderApi from "../../hooks/usePetfinderApi";
import PetFilter from "../ResultsFilter/PetFilter";
import Backdrop from "../common/Backdrop";

const PetDisplay = (props) => {
  const petRequestSent = useSelector((state) => state.petRequestSent);
  const homeRequestSent = useSelector((state) => state.homeRequestSent);
  const petData = useSelector((state) => state.petData);
  const homeData = useSelector((state) => state.homeData);

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
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

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
  data = usePetfinderApi({
    limit: props.limit,
    displayAmount: props.displayAmount,
    sendRequest,
    filter: resultsFilter,
    onRequestError: requestErrorHandler,
  });

  console.log(data);

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

  // Track whether or not the viewport width is <= 550. If so, set isMobileViewport to true. If not, set isMobileViewport
  // to false.
  useEffect(() => {
    if (window.innerWidth <= 550) {
      setIsMobileViewport(true);
    } else {
      setIsMobileViewport(false);
    }

    const updateMedia = () => {
      if (window.innerWidth <= 550) {
        setIsMobileViewport(true);
      } else {
        setIsMobileViewport(false);
      }
    };

    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

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
    setIsLoading(true);
  };

  const browseOrganizationsHandler = () => {
    history.push("/adoption-centers");
  };

  let toRender;

  if (!isLoading && data !== null) {
    toRender = (
      <div
        className={
          parsedData.data.length > 0
            ? "pet-display-item-container"
            : "no-data-message-container"
        }
      >
        <div
          className={
            parsedData.data.length > 0
              ? !props.featuredPets
                ? "pet-display-container__content"
                : "pet-display-container--featured__content"
              : "no-data-message-container__message"
          }
        >
          {parsedData.data.length > 0 ? (
            parsedData.data
              .slice(0, parsedData.itemsToShow)
              .map((animal) => (
                <PetDisplayItem
                  key={animal.key}
                  id={animal.id}
                  name={animal.name}
                  age={animal.age}
                  fixed={animal.fixed}
                  pictures={animal.pictures}
                  url={animal.url}
                  type={animal.type}
                  breed={animal.breed}
                  size={animal.size}
                  gender={animal.gender}
                  address={animal.address}
                  index={-2}
                />
              ))
          ) : (
            <p>No pets found.</p>
          )}
        </div>
        <div className="btn-container-bottom">
          {parsedData.showButton && (
            <button className="btn--alt btn--large" onClick={showMoreHandler}>
              Show More Pets
            </button>
          )}
          {history.location.pathname === "/adoptable-pets" && (
            <button
              className="btn--main btn--large"
              onClick={browseOrganizationsHandler}
            >
              Browse Adoption Centers
            </button>
          )}
        </div>
      </div>
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
      <div className="content-container">
        {ReactDOM.createPortal(
          <Backdrop class="backdrop-clear" />,
          document.getElementById("backdrop-root")
        )}
        <div
          className={
            !props.featuredPets
              ? "pet-display-container__content"
              : "pet-display-container--featured__content"
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
        <div className="btn-container-bottom">
          {history.location.pathname === "/adoptable-pets" && (
            <button
              className="btn--alt btn--large disabled"
              onClick={showMoreHandler}
            >
              Show More Pets
            </button>
          )}
          {history.location.pathname === "/adoptable-pets" && (
            <button
              className="btn--main btn--large disabled"
              onClick={browseOrganizationsHandler}
            >
              Browse Adoption Centers
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        !props.featuredPets
          ? "pet-display-container"
          : "pet-display-container--featured"
      }
    >
      {!props.featuredPets && (
        <div className="filter-container sticky">
          {isMobileViewport ? (
            <PetFilter setPageFilter={setFilterHandler} mobileVersion={true} />
          ) : (
            <PetFilter setPageFilter={setFilterHandler} mobileVersion={false} />
          )}
        </div>
      )}
      {!props.featuredPets && isMobileViewport && (
        <React.Fragment>
          <h1 className="heading--large">Adoptable Pets</h1>
          <h2 className="heading--medium">Search for an adoptable pet!</h2>
          <br />
          <br />
        </React.Fragment>
      )}
      {toRender}
    </div>
  );
};

export default PetDisplay;
