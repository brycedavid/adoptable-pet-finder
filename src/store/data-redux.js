import { createStore } from "@reduxjs/toolkit";

const dataReducer = (
  state = {
    petData: [{}],
    orgData: [{}],
    homeData: [{}],
    favoritePets: [],
    orgFilter: { location: "" },
    petFilter: {
      type: "any",
      breed: "any",
      gender: "any",
      age: "any",
      location: "",
    },
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
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
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
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
      petRequestSent: action.payload,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_PET_FILTER") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: action.payload,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_ORG_DATA") {
    return {
      orgData: action.payload,
      petData: state.petData,
      homeData: state.homeData,
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
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
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
      petRequestSent: state.petRequestSent,
      orgRequestSent: action.payload,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_ORG_FILTER") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,
      favoritePets: state.favoritePets,
      orgFilter: { location: action.payload },
      petFilter: state.petFilter,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  if (action.type === "UPDATE_HOME_DATA") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: action.payload,
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
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
      favoritePets: state.favoritePets,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: action.payload,
    };
  }

  if (action.type === "UPDATE_FAVORITE_PETS") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      homeData: state.homeData,
      favoritePets: action.payload,
      orgFilter: state.orgFilter,
      petFilter: state.petFilter,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
      homeRequestSent: state.homeRequestSent,
    };
  }

  return state;
};

const store = createStore(dataReducer);
export default store;
