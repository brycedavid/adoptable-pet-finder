// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import isEqual from "react-fast-compare";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import usePetfinderApi from "../../hooks/usePetfinderApi";
import OrganizationFilter from "../ResultsFilter/OrganizationFilter";
import Backdrop from "../common/Backdrop";

const AdoptionCenterDisplay = (props) => {
  const orgRequestSent = useSelector((state) => state.orgRequestSent);
  const orgData = useSelector((state) => state.orgData);

  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [resultsFilter, setResultsFilter] = useState({ location: "any" });
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

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
  data = usePetfinderApi({
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

  let toRender;

  if (!isLoading && parsedData !== null) {
    toRender = (
      <div
        className={
          parsedData.data.length > 0
            ? "content-container"
            : "no-data-message-container--org"
        }
      >
        <div
          className={
            parsedData.data.length > 0
              ? "org-display-container__content"
              : "no-data-message-container--org__message"
          }
        >
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
                />
              ))
          ) : (
            <p>No adoption centers found.</p>
          )}
        </div>
        <div className="btn-container-bottom">
          {parsedData.showButton && (
            <button className="btn--alt btn--large" onClick={showMoreHandler}>
              Show More
            </button>
          )}
          <button className="btn--main btn--large" onClick={browsePetsHandler}>
            Browse Adoptable Pets
          </button>
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
    const skeletonArray = [0];
    toRender = (
      <div className="content-container">
        {ReactDOM.createPortal(
          <Backdrop class="backdrop-clear" />,
          document.getElementById("backdrop-root")
        )}
        <div className="org-display-container__content">
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
        <div className="btn-container-bottom">
          <button className="btn--alt btn--large disabled">Show More</button>
          <button className="btn--main btn--large disabled">
            Browse Adoptable Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="org-display-container">
      <div className="filter-container sticky">
        {isMobileViewport ? (
          <OrganizationFilter
            setPageFilter={setFilterHandler}
            mobileVersion={true}
          />
        ) : (
          <OrganizationFilter
            setPageFilter={setFilterHandler}
            mobileVersion={false}
          />
        )}
      </div>
      {!props.featuredPets && isMobileViewport && (
        <React.Fragment>
          <h1 className="heading--large">Adoption Centers</h1>
          <h2 className="heading--medium">Search for an adoptable pet!</h2>
          <br />
          <br />
        </React.Fragment>
      )}
      {toRender}
    </div>
  );
};

export default AdoptionCenterDisplay;
