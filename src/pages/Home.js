// Home.js
// This is the homepage of the application, which is the first page the user will see. It includes
// a featured pets section and a search form.
// Base URL (/) automatically routes here in App.js.

import mainImage from "../shared/images/Puppy-and-Kitten.jpeg";

import Card from "../components/common/Card";
import Image from "../components/common/Image";
import SearchForm from "../components/Search/SearchForm";
import React from "react";
import Footer from "../components/Footer/Footer";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

const Home = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <React.Fragment>
      <div className="main-content">
        <Card class="main-image-container">
          <Image altText="cute kitty and puppy" source={mainImage} />
        </Card>
        <h1>Featured Pets</h1>
        <p className="subheader">Browse our furry friends!</p>
        {/* <Carousel /> */}
        <PetDisplay limit={25} displayAmount={8} featuredPets={true} />
        <div className="text-container">
          <h2>
            Looking to adopt a furry friend? You've come to the right place!
          </h2>
          <h3>
            With over a hundred thousand pets ready for adoption from over ten
            thousand organizations, there's no doubt we'll find the right member
            to add to the family!
          </h3>
        </div>
        <Card class="main-search-container">
          <SearchForm />
        </Card>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
