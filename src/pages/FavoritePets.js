import React, { useEffect, useState } from "react";
import PetDisplayItem from "../components/InfoDisplay/PetDisplayItem";

const FavoritePets = () => {
  const [favoritePets, setFavoritePets] = useState(null);

  useEffect(() => {
    const requestFavoritePets = async () => {
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

          setFavoritePets([...responseData.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    requestFavoritePets();
  }, []);

  if (favoritePets === null || favoritePets === undefined) {
    return (
      <React.Fragment>
        <div className="main-content">
          <h1>Favorite Pets</h1>
          <div className="display-container">
            <div className="display-container-pet">
              <div></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="main-content">
        <h1>Favorite Pets</h1>
        <div className="display-container">
          <div className="display-container-pet">
            {favoritePets.map((animal) => (
              <PetDisplayItem
                key={animal.id}
                id={animal.id}
                name={animal.name}
                age={animal.age}
                fixed={animal.fixed}
                pictures={animal.pictures}
                url={animal.url}
                type={animal.type}
                breed={animal.breed}
                size={animal.size}
                gender={animal.gender}
                address={animal.address}
                index={-2}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FavoritePets;
