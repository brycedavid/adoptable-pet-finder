import React, { useState } from "react";

const FilterResultsContext = React.createContext({
  filtered: false,
  filterValues: {},
  setFiltered: (isFiltered) => {},
  setFilter: (filterConfig) => {},
  clearFilter: () => {},
});

export const FilterResultsContextProvider = (props) => {
  const [filter, setFilter] = useState({
    type: "pets",
    breed: "any",
    gender: "any",
    age: "any",
    zip: "any",
  });
  const [filtered, setFiltered] = useState(false);

  const setFilteredHandler = (isFiltered) => {
    setFiltered(isFiltered);
  };

  const setFilterHandler = (filterConfig) => {
    setFilter({ ...filter, ...filterConfig });
  };

  const clearFilterHandler = () => {
    setFilter(null);
  };

  const contextValue = {
    filtered: filtered,
    filterValues: filter,
    setFiltered: setFilteredHandler,
    setFilter: setFilterHandler,
    clearFilter: clearFilterHandler,
  };

  return (
    <FilterResultsContext.Provider value={contextValue}>
      {props.children}
    </FilterResultsContext.Provider>
  );
};

export default FilterResultsContext;
