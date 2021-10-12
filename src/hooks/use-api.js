import { useEffect, useState } from "react";

const useApi = (petFinder, searchFor) => {
  const [error, setError] = useState(null);
  const [responsePayload, setResponsePayload] = useState(null);
  // ({
  //   type: searchFor,
  //   breed: "",
  //   page: 1,
  //   limit: 100,
  // }
  useEffect(async () => {
    console.log("API request triggered");
    setError(null);
    try {
      const response = await petFinder.animal.search();

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      setResponsePayload(response.data.animals);
      console.log(responsePayload);
    } catch (err) {
      setError(err.message || "Something went wrong... please try again.");
    }
    console.log(responsePayload);
  }, [searchFor]);
};

export default useApi;
