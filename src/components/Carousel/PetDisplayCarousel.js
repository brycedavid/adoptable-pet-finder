// PetDisplay.js
// This component acts as the PetDisplay container, which renders one PetDisplayItem.js per pet as child components. It also handles making the
// request to Petfinder API for pet data using the custom useApi hook.

import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import isEqual from "react-fast-compare";

import PetDisplayItem from "../InfoDisplay/PetDisplayItem";
import usePetfinderApi from "../../hooks/usePetfinderApi";
import ResultsFilter from "../ResultsFilter/ResultsFilter";

const CarouselPetDisplay = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [parsedData, setParsedData] = useState(null);
  const [prevData, setPrevData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const homeRequestSent = useSelector((state) => state.homeRequestSent);
  const homeData = useSelector((state) => state.homeData);

  let sendRequest = true;
  let data = null;

  if (requestError) {
    sendRequest = false;
  }

  const requestErrorHandler = useCallback((error) => {
    setRequestError(error);
  }, []);

  if (props.featuredPets && homeRequestSent) {
    sendRequest = false;
  }

  // Request pet data
  data = usePetfinderApi({
    limit: props.limit,
    displayAmount: props.displayAmount,
    sendRequest,
    filter: null,
    onRequestError: requestErrorHandler,
  });

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

    if (props.featuredPets && !homeRequestSent) {
      dispatch({ type: "UPDATE_HOME_DATA", payload: data });
      dispatch({ type: "UPDATE_HOME_REQUEST_SENT", payload: true });
    }
  }

  let toRender;

  if (!isLoading && data !== null) {
    toRender = (
      <React.Fragment>
        <div className="display-container-carousel">
          {parsedData.data.slice(0, parsedData.itemsToShow).map((animal, i) => (
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
              activeIndex={props.activeIndex}
              index={i + 1}
            />
          ))}
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
        </div>
      </React.Fragment>
    );
  }

  return <div className="display-container-pet-page">{toRender}</div>;
};

export default CarouselPetDisplay;
