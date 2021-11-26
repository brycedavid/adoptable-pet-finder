// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";
import LoadingIndicator from "../common/LoadingIndicator";
import ResultsFilter from "../ResultsFilter/ResultsFilter";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  const history = useHistory();

  // Determines whether or not we should send a request
  let sendRequest = false;

  // If there is no data and isLoading is true (initial component render), send a request
  if (parsedData === null && isLoading === true) {
    sendRequest = true;
  }

  // Request organization data
  const data = useApi({
    searchType: "organizations",
    limit: props.limit,
    type: null,
    sendRequest,
    displayAmount: 180,
  });

  // If isLoading is true and some data was received, setParsedData and set isLoading to false.
  if (data && isLoading === true) {
    setIsLoading(false);
    setParsedData({ data, itemsToShow: 15, showButton: true });
  }

  const showMoreHandler = () => {
    let { data: prevData, itemsToShow: prevItemsToShow } = parsedData;
    let hideButton = false;

    if (prevItemsToShow + 15 === 180) {
      hideButton = true;
    }

    setParsedData({
      data: prevData,
      itemsToShow: prevItemsToShow + 15,
      showButton: !hideButton,
    });
  };

  const browsePetsHandler = () => {
    history.push("/adoptable-pets");
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
    const skeletonArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    toRender = (
      <React.Fragment>
        <div className="display-container">
          <div className="display-container-organization">
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
              />
            ))}
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
      <ResultsFilter isLoading={isLoading} for="organizationDisplay" />
      {toRender}
    </div>
  );
};

export default AdoptionCenterDisplay;
