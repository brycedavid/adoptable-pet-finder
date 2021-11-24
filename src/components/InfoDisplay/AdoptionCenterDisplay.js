// AdoptionCenterDisplay.js
// This component acts as the AdoptionCenterDisplay container, which renders one AdoptionCenterDisplayItem.js per organization as child components. It also handles making the
// request to Petfinder API for organization data using the custom useApi hook.

import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import AdoptionCenterDisplayItem from "./AdoptionCenterDisplayItem";
import useApi from "../../hooks/use-api";
import LoadingIndicator from "../common/LoadingIndicator";

const AdoptionCenterDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);

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

  if (!isLoading && parsedData !== null) {
    return (
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
      </Fragment>
    );
  }

  return (
    <div className="loading-indicator-container">
      <LoadingIndicator />
    </div>
  );
};

export default AdoptionCenterDisplay;
