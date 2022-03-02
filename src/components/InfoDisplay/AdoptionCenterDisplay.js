// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import React, { Fragment, useCallback, useEffect, useState } from "react";
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
      <Fragment>
        <div className="org-display-container__content">
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
            <div className="no-data-message-container">
              <p>No adoption centers found.</p>
            </div>
          )}
        </div>
        <div className="btn-container-bottom">
          {parsedData.showButton && (
            <button
              className="btn--alt btn--display-item"
              onClick={showMoreHandler}
            >
              Show More
            </button>
          )}
          <button
            className="btn--main btn--display-item"
            onClick={browsePetsHandler}
          >
            Browse Adoptable Pets
          </button>
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
          <button className="btn--alt btn--display-item disabled">
            Show More
          </button>
          <button className="btn--main btn--display-item disabled">
            Browse Adoptable Pets
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="org-display-container">
        <div className="filter-container sticky">
          <OrganizationFilter setPageFilter={setFilterHandler} />
        </div>
        <div>{toRender}</div>
      </div>
    </React.Fragment>
  );
};

export default AdoptionCenterDisplay;
