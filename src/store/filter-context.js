import React, { useState } from "react";
import AuthContext from "./auth-context";

const FilterContext = React.createContext({
  petFilter: {},
  organizationFilter: {},
  petData: null,
  organizationData: null,
  setPetFilterHandler: (filter) => {},
  updateOrganizationFilter: (filter) => {},
  updatePetData: (data) => {},
  updateOrganizationData: (data) => {},
});

export const FilterContextProvider = (props) => {
  const [petFilter, setPetFilter] = useState({});
  const [organizationFilter, setOrganizationFilter] = useState({});
  const [petData, setPetData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);

  const setPetFilterHandler = (filter) => {
    console.log("Set pet filter called in context");
    setPetFilter(filter);
  };

  const setOrganizationFilterHandler = (filter) => {
    setOrganizationFilter(filter);
  };

  const setPetDataHandler = (data) => {
    setPetData(data);
  };

  const setOrganizationDataHandler = (data) => {
    setOrganizationData(data);
  };

  // const contextValue = {
  //   petFilter,
  //   organizationFilter,
  //   petData,
  //   organizationData,
  //   setPetFilterHandler,
  //   updateOrganizationFilter: setOrganizationFilter,
  //   updatePetData: setPetDataHandler,
  //   updateOrganizationData: setOrganizationDataHandler,
  // };

  return (
    <AuthContext.Provider
      value={{
        petFilter,
        organizationFilter,
        petData,
        organizationData,
        setPetFilterHandler,
        setOrganizationFilterHandler,
        setPetDataHandler,
        setOrganizationDataHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default FilterContext;
