import { useEffect, useState } from "react";

import { Client } from "@petfinder/petfinder-js";

let petFinderClient = null;

const useFirebase = () => {
  //const [petFinderClient, setPetfinderClient] = useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      console.log("Requesting Petfinder Client info...");
      let response = await fetch(
        "https://stalwart-fx-307719-default-rtdb.firebaseio.com/JuDjkI.json",
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Could not retrieve Client key/secret");
      }

      await response.json().then((data) => {
        let forbiddenChars = ["?", "&", "=", "."];
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
      makeRequest();
    }
  }, []);

  return petFinderClient;
};

export default useFirebase;
