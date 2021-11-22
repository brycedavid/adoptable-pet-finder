import React, { useState } from "react";
import AuthContext from "./auth-context";

const FilterContext = React.createContext({
  petFilter: {
    type: "",
    breed: "",
    gender: "",
    age: "",
    location: "",
  },
  organizationFilter: null,
  updatePetFilter: (filter) => {},
  updateOrganizationFilter: (filter) => {},
});

export const FilterContextProvider = (props) => {
  const [petFilter, setPetFilter] = useState({
    type: "any",
    breed: "any",
    gender: "any",
    age: "any",
    location: "any",
  });
  const [organizationFilter, setOrganizationFilter] = useState(null);

  const setPetFilterHandler = (filter) => {
    console.log("Set pet filter called in context");
    setPetFilter(filter);
  };

  const setOrganizationFilterHandler = (filter) => {
    setOrganizationFilter(filter);
  };

  const contextValue = {
    petFilter,
    organizationFilter,
    updatePetFilter: setPetFilterHandler,
    updateOrganizationFilter: setOrganizationFilter,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default FilterContext;
