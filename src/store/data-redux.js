import { createStore } from "@reduxjs/toolkit";

const dataReducer = (
  state = {
    petData: [{}],
    orgData: [{}],
    homeData: [{}],
    petRequestSent: false,
    orgRequestSent: false,
    homeRequestSent: false,
  },
  action
) => {
  if (action.type === "UPDATE_PET_DATA") {
    return {
      orgData: state.orgData,
      petData: action.payload,
      homeData: state.homeData,

      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_PET_REQUEST_SENT") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,

      petRequestSent: action.payload,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_ORG_DATA") {
    return {
      orgData: action.payload,
      petData: state.petData,
      homeData: state.homeData,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_ORG_REQUEST_SENT") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,
      petRequestSent: state.petRequestSent,
      orgRequestSent: action.payload,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_HOME_DATA") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: action.payload,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_HOME_REQUEST_SENT") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: action.payload,
    };
  }

  return state;
};

const store = createStore(dataReducer);
export default store;
