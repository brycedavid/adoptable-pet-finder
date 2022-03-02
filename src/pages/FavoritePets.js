import React, { useEffect, useState } from "react";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Footer from "../components/Footer/Footer";
import PetDisplayItem from "../components/InfoDisplay/PetDisplayItem";

const FavoritePets = () => {
  const [favoritePets, setFavoritePets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestFavoritePets = async () => {
      // Make request for favorite pets for user using token from context
      const token = localStorage.getItem("token");
      const slicedToken = token.slice(0, 64);
      setIsLoading(true);

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
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    requestFavoritePets();
  }, []);

  let toRender;

  if (isLoading) {
    toRender = <LoadingIndicator />;
  }

  if ((favoritePets === null || favoritePets === undefined) && !isLoading) {
    toRender = <div>No favorite pets</div>;
  }

  return (
    <React.Fragment>
      <div className="main-content">
        <h1 className="heading--large">Favorite Pets</h1>
        <div className="display-container--favorites">
          <div className="display-container--pet">
            {!isLoading && favoritePets
              ? favoritePets.map((animal) => (
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
                ))
              : toRender}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FavoritePets;
