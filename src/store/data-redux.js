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
  if (action.type === "updatePetData") {
    return {
      orgData: state.orgData,
      petData: action.payload,
      homeData: state.homeData,

      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "updatePetRequestSent") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,

      petRequestSent: action.payload,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "updateOrgData") {
    return {
      orgData: action.payload,
      petData: state.petData,
      homeData: state.homeData,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "updateOrgRequestSent") {
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

  if (action.type === "updateHomeRequestSent") {
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
