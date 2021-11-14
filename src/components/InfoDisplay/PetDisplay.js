// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import isEqual from "react-fast-compare";

import classes from "./PetDisplay.module.css";

import PetDisplayItem from "./PetDisplayItem";
import useApi from "../../hooks/use-api";
import LoadingIndicator from "../UI/LoadingIndicator";

const PetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [prevData, setPrevData] = useState(null);

  // Determines whether or not we should send a request
  let sendRequest = true;
  let data = null;

  if (props.petsFilter && !isEqual(props.petsFilter, filter)) {
    setPrevData(parsedData.data);
    console.log("Filters in PetDisplay not equal. Setting filter to: ");
    console.log(props.petsFilter);
    setFilter(props.petsFilter);
    setIsLoading(true);
    setParsedData(null);
  } else {
    console.log("No filter necessary; not setting filter");
  }

  const history = useHistory();

  // Request pet data
  data = useApi({
    limit: props.limit,
    displayAmount: props.displayAmount,
    sendRequest,
    filter: props.petsFilter,
    shouldFilter: props.filtered,
  });

  console.log(data);
  console.log(isLoading);

  // If isLoading is true and some data was received, setParsedData and set isLoading to false.
  if (data !== null && data !== prevData) {
    setIsLoading(false);
    console.log("Data from request: ");
    console.log(data);
    setPrevData(data);
    setParsedData({
      data,
      itemsToShow: 12,
      showButton: props.featuredPets ? false : true,
    });
  }
  const showMoreHandler = () => {
    let { data: prevData, itemsToShow: prevItemsToShow } = parsedData;
    let hideButton = false;

    if (prevItemsToShow + 12 === 96) {
      hideButton = true;
    }

    setParsedData({
      data: prevData,
      itemsToShow: prevItemsToShow + 12,
      showButton: !hideButton,
    });
  };

  const browseOrganizationsHandler = () => {
    history.push("/adoption-centers");
  };

  if (!isLoading && data !== null) {
    return (
      <Fragment>
        <div className="display-item-container">
          <div className={classes["pet-display-container"]}>
            {parsedData.data.slice(0, parsedData.itemsToShow).map((animal) => (
              <PetDisplayItem
                key={animal.key}
                name={animal.name}
                age={animal.age}
                fixed={animal.fixed}
                pictures={animal.pictures}
                url={animal.url}
                type={animal.type}
              />
            ))}
          </div>
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
      </Fragment>
    );
  }

  return (
    <div className="loading-indicator-container">
      <LoadingIndicator />
    </div>
  );
};

export default PetDisplay;
