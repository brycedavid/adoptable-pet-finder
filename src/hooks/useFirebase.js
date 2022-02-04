import { useEffect } from "react";

import { Client } from "@petfinder/petfinder-js";

let petFinderClient = null;
let bingKey = null;

let forbiddenChars = ["?", "&", "=", "."];

const useFirebase = (requestFor) => {
  useEffect(() => {
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

    if (petFinderClient === null) {
      requestClient();
    }

    if (requestFor === "bing" && bingKey === null) {
      requestBingCreds();
    }
  }, []);

  if (requestFor === "petfinder") {
    return petFinderClient;
  }

  if (requestFor === "bing") {
    return bingKey;
  }
};

export default useFirebase;
