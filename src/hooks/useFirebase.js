import { useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

let petFinderClient = null;
let bingKey = null;
let favoritePets = [];

let forbiddenChars = ["?", "&", "=", "."];

const useFirebase = (requestFor, favoriteData = null) => {
  useEffect(() => {
    console.log("In useFirebase");
    const requestBingCreds = async () => {
      console.log("Requesting bing creds...");
      let dbResponseData = null;

      dbResponseData = await fetch(
        "https://stalwart-fx-307719-default-rtdb.firebaseio.com/SuIdkU.json",
        { method: "GET" }
      );

      if (!dbResponseData.ok) {
        throw new Error("Could not retrieve Client key/secret");
      }

      await dbResponseData.json().then((data) => {
        for (let char of forbiddenChars) {
          data.aIendD = data.aIendD.split(char).join("");
        }
        bingKey = data.aIendD;
      });
    };

    const requestClient = async () => {
      console.log("Requesting Petfinder Client info...");
      let response = await fetch(
        "https://stalwart-fx-307719-default-rtdb.firebaseio.com/JuDjkI.json",
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Could not retrieve Client key/secret");
      }

      await response.json().then((data) => {
        for (let char of forbiddenChars) {
          data.sKdnH = data.sKdnH.split(char).join("");
          data.julncD = data.julncD.split(char).join("");
        }

        petFinderClient = new Client({
          apiKey: data.sKdnH,
          secret: data.julncD,
        });
      });
    };

    const requestFavoritePets = () => {
      // Make request for favorite pets for user using token from context
      const token = localStorage.getItem("token");
      const slicedToken = token.slice(0, 64);

      let data;
      fetch(
        `https://stalwart-fx-307719-default-rtdb.firebaseio.com/favoritePets/${slicedToken}.json`,
        {
          method: "GET",
        }
      )
        .then(async (response) => {
          const responseData = await response.json();
          console.log(responseData);

          if (!response.ok) {
            throw new Error(response.error.message);
          }

          data = [...responseData.data];
          favoritePets = data;
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(data);

      return data;
    };

    const updateFavoritePets = async () => {
      // Make request for favorite pets for user using token from context
      const token = localStorage.getItem("token");
      const slicedToken = token.slice(0, 64);
      let data;

      await fetch(
        `https://stalwart-fx-307719-default-rtdb.firebaseio.com/favoritePets/${slicedToken}.json`,
        {
          method: "GET",
        }
      )
        .then(async (response) => {
          const responseData = await response.json();
          console.log(responseData);

          if (!response.ok) {
            throw new Error(response.error.message);
          }

          let parsedData = [];

          if (responseData !== null) {
            console.log(responseData.data);

            let data = [...responseData.data, ...favoriteData];

            const ids = data.map((o) => o.id);
            console.log(ids);
            let parsedData = data.filter(
              ({ id }, index) => !ids.includes(id, index + 1)
            );

            console.log(parsedData);

            await fetch(
              `https://stalwart-fx-307719-default-rtdb.firebaseio.com/favoritePets/${slicedToken}.json`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  data: parsedData,
                }),
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Methods": "GET, PUT, UPDATE, PATCH",
                },
              }
            )
              .then(async (response) => {
                const responseData = await response.json();

                if (!response.ok) {
                  throw new Error(responseData.error.message);
                }

                data = parsedData;
                favoritePets = parsedData;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            parsedData = [...favoriteData];
            console.log(parsedData);

            await fetch(
              `https://stalwart-fx-307719-default-rtdb.firebaseio.com/favoritePets/${slicedToken}.json`,
              {
                method: "PUT",
                body: JSON.stringify({
                  data: parsedData,
                }),
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Methods": "GET, PUT, UPDATE, PATCH",
                },
              }
            )
              .then((response) => {
                const responseData = response.json();
                data = parsedData;
                favoritePets = parsedData;

                if (!response.ok) {
                  throw new Error(responseData.error.message);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    };

    const removeFavoritePet = async () => {
      console.log("In remove favorite");
      // Make request for favorite pets for user using token from context
      const token = localStorage.getItem("token");
      const slicedToken = token.slice(0, 64);

      await fetch(
        `https://stalwart-fx-307719-default-rtdb.firebaseio.com/favoritePets/${slicedToken}.json`,
        {
          method: "GET",
        }
      )
        .then(async (response) => {
          const responseData = await response.json();
          console.log(responseData);

          if (!response.ok) {
            throw new Error(response.error.message);
          }

          console.log("FAVORITE DATA RETRIEVED:");

          let parsedData = [];

          console.log(responseData.data);

          let data = [...responseData.data];

          parsedData = data.filter(({ id }) => id !== favoriteData[0].id);

          console.log("DATA BEING UPLOADED:");
          console.log(parsedData);

          console.log("Initiating data set");

          await fetch(
            `https://stalwart-fx-307719-default-rtdb.firebaseio.com/favoritePets/${slicedToken}.json`,
            {
              method: "PATCH",
              body: JSON.stringify({
                data: parsedData,
              }),
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Methods": "GET, PUT, UPDATE, PATCH",
              },
            }
          )
            .then(async (response) => {
              const responseData = await response.json();

              if (!response.ok) {
                throw new Error(responseData.error.message);
              }

              console.log("FAVORITE DATA UPDATED");
              data = parsedData;
              favoritePets = parsedData;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    };

    if (requestFor === "petfinder" && petFinderClient === null) {
      requestClient();
    }

    if (requestFor === "bing" && bingKey === null) {
      requestBingCreds();
    }

    if (requestFor === "getFavorites") {
      requestFavoritePets();
    }

    if (requestFor === "updateFavorites") {
      updateFavoritePets();
    }

    if (requestFor === "removeFavorite") {
      console.log("HERE HERE HERE");
      removeFavoritePet();
    }
  }, [requestFor]);

  if (requestFor === "petfinder") {
    return petFinderClient;
  }

  if (requestFor === "bing") {
    return bingKey;
  }

  if (requestFor === "getFavorites" || requestFor === "updateFavorites") {
    return favoritePets;
  }
};

export default useFirebase;
