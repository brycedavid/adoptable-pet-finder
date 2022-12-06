// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import isEqual from "react-fast-compare";

import PetDisplayItemContainer from "./PetDisplayItemContainer";
import usePetfinderApi from "../../hooks/usePetfinderApi";
import PetFilter from "../ResultsFilter/PetFilter";
import PetDisplaySkeleton from "./PetDisplaySkeleton";
import DisplayErrorMessage from "./DisplayErrorMessage";
import { determineSendRequest, determineShowButton, dispatchData } from "../../shared/utils/displayHelpers";

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
  const [isSmallDesktopViewport, setIsSmallDesktopViewport] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  let sendRequest = determineSendRequest(requestError, resultsFilter, petRequestSent, props.featuredPets, homeRequestSent);

  const requestErrorHandler = useCallback((error) => {
    setRequestError(error);
  }, []);

  // Request pet data if filter has changed
  let data = usePetfinderApi({
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
    let showButton = determineShowButton(data, props.featuredPets);

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
    const updateMedia = () => {
      if (window.innerWidth <= 550) {
        setIsMobileViewport(true);
      } else {
        setIsMobileViewport(false);
      }

      if (window.innerWidth <= 1060) {
        setIsSmallDesktopViewport(true);
      } else {
        setIsSmallDesktopViewport(false);
      }
    };

    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  // Method which allows us to display more pets on page
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

  // Navigate to adoption center page
  const browseOrganizationsHandler = () => {
    history.push("/adoption-centers");
  };

  let toRender;

  if (!isLoading && data !== null) {
    toRender = <PetDisplayItemContainer featuredPets={props.featuredPets} browseOrganizationsHandler={browseOrganizationsHandler} showMoreHandler={showMoreHandler} parsedData={parsedData} resultsFilter={resultsFilter} />;
  } else if (requestError) {
    toRender = <DisplayErrorMessage message={"Something went wrong with your request. Please check your search values and try again."} />;
  } else {
    toRender = <PetDisplaySkeleton isSmallDesktopViewport={isSmallDesktopViewport} isMobileViewport={isMobileViewport} showMoreHandler={showMoreHandler} browseOrganizationsHandler={browseOrganizationsHandler} featuredPets={props.featuredPets} />;
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
