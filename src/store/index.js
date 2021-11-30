import { createStore } from "@reduxjs/toolkit";

const dataReducer = (
  state = {
    petData: [{}],
    orgData: [{}],
    petRequestSent: false,
    orgRequestSent: false,
  },
  action
) => {
  if (action.type === "updatePetData") {
    return {
      orgData: state.orgData,
      petData: action.payload,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
    };
  }

  if (action.type === "updatePetRequestSent") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      petRequestSent: action.payload,
      orgRequestSent: state.orgRequestSent,
    };
  }

  if (action.type === "updateOrgData") {
    return {
      orgData: action.payload,
      petData: state.petData,
      petRequestSent: state.petRequestSent,
      orgRequestSent: state.orgRequestSent,
    };
  }

  if (action.type === "updateOrgRequestSent") {
    return {
      orgData: state.orgData,
      petData: state.petData,
      petRequestSent: state.petRequestSent,
      orgRequestSent: action.payload,
    };
  }

  return state;
};

const store = createStore(dataReducer);
export default store;
