import { useState, useEffect } from "react";

import { fetchData } from "../lib/api";

const useApi = (searchOptions) => {
  const [data, setData] = useState(null);

  let { searchType, limit, type, sendRequest, displayAmount } = searchOptions;

  useEffect(() => {
    const makeRequest = async () => {
      console.log("Requesting pet data...");
      const responseData = await fetchData({
        searchType,
        limit,
        type,
      });
      console.log(responseData);

      let dataArray = [];

      if (searchType === "organizations") {
        for (let organization of responseData.data.organizations) {
          dataArray.push({
            key: organization.id,
            id: organization.id,
            address: organization.address,
            name: organization.name,
            url: organization.url,
          });
        }
      }

      if (searchType === "pets") {
        for (let animal of responseData.data.animals) {
          dataArray.push({
            key: animal.id,
            id: animal.id,
            name: animal.name,
            age: animal.age,
            fixed: animal.attributes.spayed_neutered,
            pictures: animal.photos,
            url: animal.url,
            type: animal.type,
          });
        }
      }

      console.log(dataArray);
      setData(dataArray.slice(0, displayAmount));
    };

    if (sendRequest === true) {
      makeRequest();

      // setIsLoading(false);
      // setData(responseData);
    }

    return () => {
      // cancel request
    };
  }, [
    fetchData,
    searchOptions,
    sendRequest,
    displayAmount,
    limit,
    type,
    searchType,
  ]);

  return data;
};
export default useApi;
