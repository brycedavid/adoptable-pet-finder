import { useState, useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

const petFinderClient = new Client({
  apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
  secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
});

const useApi = (searchOptions) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let { searchType, limit, type, sendRequest, displayAmount } = searchOptions;

  useEffect(() => {
    const makeRequest = async () => {
      let responseData = null;
      let dataArray = [];
      console.log("Requesting pet data...");

      switch (searchType) {
        case "pets":
          responseData = await petFinderClient.animal
            .search({
              type,
              limit,
            })
            .catch((error) => {
              console.log(error.request, error.response);
            });

          if (responseData) {
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
          break;

        case "organizations":
          responseData = await petFinderClient.organization
            .search({
              limit,
            })
            .catch((error) => {
              console.log(error.request, error.response);
            });

          if (responseData) {
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
          break;

        default:
          responseData = null;
          break;
      }

      console.log(responseData);
      console.log(dataArray);
      setData(dataArray.slice(0, displayAmount));
    };

    if (sendRequest) {
      makeRequest();
    }

    return () => {
      // cancel request
    };
  }, [sendRequest, displayAmount, limit, type, searchType]);

  return data;
};
export default useApi;
