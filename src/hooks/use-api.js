import { useCallback, useState } from "react";

const useApi = (petFinder, searchFor) => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    console.log("IN sendRequest");
    setError(null);
    try {
      const response = await petFinder.animal.search({
        type: searchFor,
        breed: "",
        page: 1,
        limit: 100,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      console.log(response.data.animals);
    } catch (err) {
      setError(err.message || "Something went wrong... please try again.");
    }
  }, [petFinder, searchFor]);

  return {
    error,
    sendRequest,
  };
};

export default useApi;
